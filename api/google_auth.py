from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from google.oauth2 import id_token
from google.auth.transport import requests
import os
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")

class User:
  def __init__(self, google_id: str, email: str, name: str):
    self.google_id = google_id
    self.email = email
    self.name = name

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        return User(google_id=idinfo.get("sub"), email=idinfo.get("email"), name=idinfo.get("name"))
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f'Invalid token {token} {e}')