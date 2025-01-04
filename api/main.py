from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlhelper import get_db, init_db, db_execute
from google_auth import oauth2_scheme, get_current_user
from fastapi.middleware.cors import CORSMiddleware
import datetime
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

init_db()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Authorization"],
)

class Blink(BaseModel):
    id: int
    type: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/user/register")
async def create_user(token: str=Depends(oauth2_scheme)):
    user = await get_current_user(token)
    user_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM user WHERE google_id=?", (user.google_id,)).fetchone()
        )
    
    if (user_db is not None):
        return {"status": "existing"}
    
    db_execute(lambda cursor:
        cursor.execute("INSERT INTO user (google_id, username, email) VALUES (?, ?, ?)", (user.google_id, user.name, user.email))
    )
    return {"status": "success"}

@app.post("/user/unregister")
async def delete_user(token: str=Depends(oauth2_scheme)):
    user = await get_current_user(token)
    db_execute(lambda cursor:
        cursor.execute("DELETE FROM user WHERE google_id=?", (user.google_id,)))
    return {"status": "success"}

@app.get("/user")
async def get_user(token: str=Depends(oauth2_scheme)):
    user = await get_current_user(token)
    user_db = db_execute(lambda cursor:
        cursor.execute("SELECT * FROM user WHERE google_id=?", (user.google_id,)).fetchone()
        )
    if (user_db is None):
        return {"registered": False}
    return {
        "registered": True,
        "google_id": user_db[0],
        "username": user_db[1],
        "email": user_db[2],
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