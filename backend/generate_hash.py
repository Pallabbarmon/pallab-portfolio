from passlib.context import CryptContext

ctx = CryptContext(schemes=["bcrypt"])

password = "*#pallab8640#*"

print(ctx.hash(password))