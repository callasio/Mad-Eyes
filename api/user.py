from fastapi import Depends, FastAPI
from pydantic import BaseModel

from utils.google_auth import get_current_user, oauth2_scheme
from utils.sql_utils import db_execute

class Blink(BaseModel):
  id: int
  type: str

class UserRegisterData(BaseModel):
  nickname: str
  profilePicture: bytes | None

def user_init(app: FastAPI):
  @app.get("/user")
  async def get_user(token: str=Depends(oauth2_scheme)):
    user = await get_current_user(token)
    user_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM users WHERE id=?", (user.google_id,)).fetchone()
      )
    
    if (user_db is None):
      return {"registered": False}
    
    return {
      "registered": True,
      "id": user_db[0],
      "username": user_db[1],
      "email": user_db[2],
    }

  @app.post("/user/register")
  async def create_user(userRegisterData: UserRegisterData, token: str=Depends(oauth2_scheme)):
      user_google = await get_current_user(token)
      user_db = db_execute(lambda cursor:
          cursor.execute("SELECT * FROM users WHERE id=?", (user_google.google_id,)).fetchone()
        )
      
      if (user_db is not None):
        return {"status": "existing"}
      
      db_execute(lambda cursor:
        cursor.execute("""
          INSERT INTO users (
            id,
            email
            nickname
            profilePicture
          ) VALUES (?, ?, ?, ?)
          """, (
            user_google.id,
            user_google.email,
            userRegisterData.nickname,
            userRegisterData.profilePicture
          ))
      )
      return {"status": "success"}

  @app.post("/user/unregister")
  async def delete_user(token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)
    user_db = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM users WHERE id=?", (user_google.google_id,)).fetchone()
      )
    
    if (user_db is None):
      return {"status": "nonexistent"}

    db_execute(lambda cursor:
      cursor.execute("DELETE FROM users WHERE id=?", (user_google.google_id,)))
    return {"status": "success"}