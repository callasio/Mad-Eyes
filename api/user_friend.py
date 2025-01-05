from fastapi import FastAPI
from user import decode_picture
from utils.sql_utils import db_execute


def user_friend_init(app: FastAPI):
  @app.get("/user/{user_id}/friends")
  async def get_friends(user_id: str):
    friends_db = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM users WHERE id IN (SELECT friend_id FROM user_friends WHERE id=?)", (user_id,)).fetchall()
    )

    friends = []
    for friend_db in friends_db:
      profile_picture_base64 = decode_picture(friend_db[3])
      friends.append({
        "id": friend_db[0],
        "email": friend_db[1],
        "nickname": friend_db[2],
        "profilePicture": profile_picture_base64,
      })

    return friends

  @app.post("/user/{user_id}/friend/{friend_id}")
  async def add_friend(user_id: str, friend_id: str):
    existing_friendship = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM user_friends WHERE id=? AND friend_id=?", (user_id, friend_id)).fetchone()
    )

    if existing_friendship:
      return {"status": "exists"}

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO user_friends VALUES (?, ?)", (user_id, friend_id))
    )

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO user_friends VALUES (?, ?)", (friend_id, user_id))
    )

    return {"status": "success"}

  @app.delete("/user/{user_id}/friend/{friend_id}")
  async def delete_friend(user_id: str, friend_id: str):
    existing_friendship = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM user_friends WHERE id=? AND friend_id=?", (user_id, friend_id)).fetchone()
    )

    if existing_friendship is None:
      return {"status": "not_found"}

    db_execute(lambda cursor:
      cursor.execute("DELETE FROM user_friends WHERE id=? AND friend_id=?", (user_id, friend_id))
    )

    return {"status": "success"}