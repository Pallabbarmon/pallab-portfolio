from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: Optional[str] = ""
    image_url: Optional[str] = ""
    live_url: Optional[str] = ""
    github_url: Optional[str] = ""
    featured: bool = False
    display_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class CertificateOut(BaseModel):
    id: int
    title: str
    issuer: Optional[str] = ""
    image_path: str
    display_order: int
    created_at: datetime
    class Config:
        from_attributes = True

class DocumentOut(BaseModel):
    doc_type: str
    title: str
    file_path: str
    class Config:
        from_attributes = True

class VisitStats(BaseModel):
    total_visits: int
    visits_by_day: dict[str, int]