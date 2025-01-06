from fastapi import FastAPI
from blink import blink_init
from user_friend import user_friend_init
from user import user_init
from activity import activity_init
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

from utils.sql_utils import init_db

load_dotenv()

init_db()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Authorization"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

user_init(app)
user_friend_init(app)
blink_init(app)
activity_init(app)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)