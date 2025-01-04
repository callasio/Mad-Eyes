from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlhelper import get_db, init_db
import datetime

init_db()
app = FastAPI()

class Blink(BaseModel):
    id: int
    type: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/blink")
def create_blink(blink: Blink, cursor=Depends(get_db)):
    timestamp = datetime.datetime.now()
    cursor.execute("INSERT INTO blink (id, timestamp, type) VALUES (?, ?, ?)", (blink.id, timestamp, blink.type))

@app.get("/blinks")
def read_blinks(cursor=Depends(get_db)):
    cursor.execute("SELECT * FROM blink")
    return cursor.fetchall()