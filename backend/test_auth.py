from passlib.context import CryptContext

ctx = CryptContext(schemes=["bcrypt"])

password = "*#P@ll@b@2224#*"
hash_value = "$2b$12$sQOu423rLjHMlT8UC9zoMulvf/PsVVGvO5izyvSftEQeuWMJ3PwRK"

print(ctx.verify(password, hash_value))