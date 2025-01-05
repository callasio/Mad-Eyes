from fastapi import Depends, FastAPI

from utils.sql_utils import db_execute
from utils.google_auth import get_current_user, oauth2_scheme


def blink_init(app: FastAPI):
  @app.get("/blinks/{user_id}")
  async def get_blinks(
    user_id: str,
  ):
    blink_datas = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM blink_event WHERE id=?", (user_id,)).fetchall()
    )

    blinks = {}

    blink_datas.sort(key=lambda x: x[2])

    for blink_data in blink_datas:
      if blinks[blink_data[1]] is None:
        blinks[blink_data[1]] = []

      blinks[blink_data[1]].append(blink_data[3])
    
    return blinks
  
  @app.post("/blinks/{record_id}/{minutes}")
  async def add_blink(
    record_id: str,
    minutes: int,
    count: int,
    token: str=Depends(oauth2_scheme)
  ):
    user = get_current_user(token)
    user_id = user.google_id

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO blink_event VALUES (?, ?, ?, ?)", (user_id, record_id, minutes, count))
    )

    return {"success": True}