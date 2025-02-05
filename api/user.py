import base64
from fastapi import Depends, FastAPI, File, Form, UploadFile
from pydantic import BaseModel

from utils.google_auth import get_current_user, oauth2_scheme
from utils.sql_utils import db_execute

def decode_picture(picture):
  return base64.b64encode(picture).decode('utf-8') if picture else None

def user_init(app: FastAPI):
  @app.get("/user")
  async def get_user(token: str=Depends(oauth2_scheme)):
    user = await get_current_user(token)
    user_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM users WHERE id=?", (user.google_id,)).fetchone()
      )
    
    if (user_db is None):
      return {"registered": False}
    
    profile_picture_base64 = decode_picture(user_db[3])
    
    return {
      "registered": True,
      "id": user_db[0],
      "email": user_db[1],
      "nickname": user_db[2],
      "profilePicture": profile_picture_base64,
    }
  
  @app.get("/user/{user_id}")
  async def get_user_by_id(user_id: str):
    user_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
      )
    
    if (user_db is None):
      return {"registered": False}
    
    profile_picture_base64 = decode_picture(user_db[3])
    
    return {
      "registered": True,
      "id": user_db[0],
      "email": user_db[1],
      "nickname": user_db[2],
      "profilePicture": profile_picture_base64,
    }
  
  @app.get("/user/search/{nickname}")
  async def search_user(nickname: str):
    users_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM users WHERE nickname LIKE ?", (f"%{nickname}%",)).fetchall()
      )
    
    users = []
    for user_db in users_db:
      profile_picture_base64 = decode_picture(user_db[3])
      users.append({
        "id": user_db[0],
        "email": user_db[1],
        "nickname": user_db[2],
        "profilePicture": profile_picture_base64,
      })
    
    return users

  @app.post("/user/register")
  async def create_user(
    nickname: str = Form(...),
    profilePicture: UploadFile | None = File(None),
    token: str=Depends(oauth2_scheme)
  ):
      user_google = await get_current_user(token)
      user_db = db_execute(lambda cursor:
          cursor.execute("SELECT * FROM users WHERE id=?", (user_google.google_id,)).fetchone()
        )
      
      if (user_db is not None):
        return {"status": "existing"}
      
      profile_picture_data = await profilePicture.read() if profilePicture is not None else None
      
      db_execute(lambda cursor:
        cursor.execute("""
          INSERT INTO users (
            id,
            email,
            nickname,
            profilePicture
          ) VALUES (?, ?, ?, ?)
          """, (
            user_google.google_id,
            user_google.email,
            nickname,
            profile_picture_data
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
  
  @app.post("/user/update")
  async def update_user(
    nickname: str = Form(...),
    profilePicture: UploadFile | None = File(None),
    token: str=Depends(oauth2_scheme)
  ):
    user_google = await get_current_user(token)
    user_db = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM users WHERE id=?", (user_google.google_id,)).fetchone()
      )
    
    if (user_db is None):
      return {"status": "nonexistent"}
    
    profile_picture_data = await profilePicture.read() if profilePicture is not None else None
    
    db_execute(lambda cursor:
      cursor.execute("""
        UPDATE users
        SET nickname=?, profilePicture=?
        WHERE id=?
        """, (
          nickname,
          profile_picture_data,
          user_google.google_id
        ))
    )
    return {"status": "success"}