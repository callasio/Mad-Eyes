from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlhelper import get_db, init_db
import datetime
import uvicorn
import os
from dotenv import load_dotenv
from google import oauth2_scheme, get_current_user, User

load_dotenv()

init_db()
app = FastAPI()

class Blink(BaseModel):
    id: int
    type: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/user")
def create_user(token: str=Depends(oauth2_scheme), cursor=Depends(get_db)):
    user = get_current_user(token)
    cursor.execute("INSERT INTO user (google_id, username, email) VALUES (?, ?, ?)", (user.google_id, user.username, user.email))
    return {}

@app.get("/user")
def get_user(token: str=Depends(oauth2_scheme), cursor=Depends(get_db)):
    user = get_current_user(token)
    cursor.execute("SELECT * FROM user WHERE google_id=?", (user.google_id,))
    user = cursor.fetchone()
    if (user is None):
        return {"registered": False}
    return {
        "registered": True,
        "google_id": user[0],
        "username": user[1],
        "email": user[2],
    }

@app.post("/blink")
def create_blink(blink: Blink, cursor=Depends(get_db)):
    timestamp = datetime.datetime.now()
    cursor.execute("INSERT INTO blink (id, timestamp, type) VALUES (?, ?, ?)", (blink.id, timestamp, blink.type))
    return {}

@app.get("/blinks")
def read_blinks(cursor=Depends(get_db)):
    cursor.execute("SELECT * FROM blink")
    return cursor.fetchall()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)