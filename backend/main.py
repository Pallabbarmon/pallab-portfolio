import os
import shutil
import uuid
from datetime import datetime, timedelta
from collections import defaultdict

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import models, schemas, auth
from database import engine, get_db

load_dotenv()
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ---------- Auth ----------
@app.post("/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if not auth.authenticate_admin(form_data.username, form_data.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = auth.create_access_token(data={"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

# ---------- Projects (public) ----------
@app.get("/api/projects", response_model=list[schemas.ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return (
        db.query(models.Project)
        .order_by(models.Project.display_order, models.Project.id.desc())
        .all()
    )

# ---------- Projects (admin) ----------
@app.post("/api/projects", response_model=schemas.ProjectOut)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    new_project = models.Project(**project.dict())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@app.put("/api/projects/{project_id}", response_model=schemas.ProjectOut)
def update_project(
    project_id: int,
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    for key, value in project.dict().items():
        setattr(db_project, key, value)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/api/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return {"ok": True}

# ---------- Certificates (public) ----------
@app.get("/api/certificates", response_model=list[schemas.CertificateOut])
def list_certificates(db: Session = Depends(get_db)):
    return (
        db.query(models.Certificate)
        .order_by(models.Certificate.display_order, models.Certificate.id.desc())
        .all()
    )

# ---------- Certificates (admin) ----------
@app.post("/api/certificates", response_model=schemas.CertificateOut)
def create_certificate(
    title: str = Form(...),
    issuer: str = Form(""),
    display_order: int = Form(0),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_cert = models.Certificate(
        title=title,
        issuer=issuer,
        image_path=f"/uploads/{unique_name}",
        display_order=display_order,
    )
    db.add(new_cert)
    db.commit()
    db.refresh(new_cert)
    return new_cert
# ---------- Documents (public) ----------
@app.get("/api/documents/{doc_type}", response_model=schemas.DocumentOut)
def get_document(doc_type: str, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.doc_type == doc_type).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

# ---------- Documents (admin) ----------
@app.post("/api/documents", response_model=schemas.DocumentOut)
def upload_document(
    doc_type: str = Form(...),
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{doc_type}_{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    existing = db.query(models.Document).filter(models.Document.doc_type == doc_type).first()

    if existing:
        old_path = existing.file_path.lstrip("/")
        if os.path.exists(old_path):
            os.remove(old_path)
        existing.title = title
        existing.file_path = f"/uploads/{unique_name}"
        db.commit()
        db.refresh(existing)
        return existing

    new_doc = models.Document(
        doc_type=doc_type,
        title=title,
        file_path=f"/uploads/{unique_name}",
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

@app.delete("/api/certificates/{cert_id}")
def delete_certificate(
    cert_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    cert = db.query(models.Certificate).filter(models.Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")

    file_path = cert.image_path.lstrip("/")
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(cert)
    db.commit()
    return {"ok": True}

# ---------- Visit tracking (public) ----------
@app.post("/api/visit")
def record_visit(path: str = "/", db: Session = Depends(get_db)):
    visit = models.Visit(path=path)
    db.add(visit)
    db.commit()
    return {"ok": True}

# ---------- Visit stats (admin) ----------
@app.get("/api/stats", response_model=schemas.VisitStats)
def get_stats(
    db: Session = Depends(get_db),
    _admin: str = Depends(auth.get_current_admin),
):
    all_visits = db.query(models.Visit).all()
    total = len(all_visits)

    by_day = defaultdict(int)
    for v in all_visits:
        day_key = v.visited_at.strftime("%Y-%m-%d")
        by_day[day_key] += 1

    return {
        "total_visits": total,
        "visits_by_day": dict(sorted(by_day.items())),
    }