from fastapi import Depends, FastAPI

from utils.sql_utils import db_execute
from utils.google_auth import get_current_user, oauth2_scheme
from datetime import datetime, timedelta


def activity_init(app: FastAPI):
  @app.post('/active')
  async def im_active(token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)
    
    db_execute(lambda cursor:
      cursor.execute("INSERT OR REPLACE INTO activity (id, last_active) VALUES (?, CURRENT_TIMESTAMP)", (user_google.google_id,))
    )

    return {"status": "success"}
  
  @app.get("/active/{user_id}")
  async def get_user_activity(user_id: str) -> bool:
    result = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM activity WHERE id=?", (user_id,)).fetchone()
    )

    if result is None:
      return False

    last_active = result[1]

    current_time = db_execute(lambda cursor:
      cursor.execute("SELECT CURRENT_TIMESTAMP").fetchone())[0]
    
    if last_active < current_time - timedelta(minutes=10):
      return False

    return True
  
  @app.get("/record/current/{user_id}")
  async def get_current_record(user_id: str):
    result: list = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM blink_event WHERE id=?", (user_id,))
    )

    if result is None:
      return { "status": "success", "record": None }
    
    latest = min(result, key=lambda x: (x[1], x[2]))

    record_start_time = datetime.fromisoformat(latest[1])
    record_duration = timedelta(minutes=latest[2])

    record_last = record_start_time + record_duration

    is_current_session = record_last >= datetime.now() - timedelta(minutes=5)

    return { "status": "success", "record": {
      "start": latest[1],
      "duration": latest[2],
      "online": is_current_session
    }}