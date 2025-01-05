from fastapi import Depends, FastAPI
from user import decode_picture
from utils.sql_utils import db_execute
from utils.google_auth import get_current_user, oauth2_scheme


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
  
  @app.get("/friend/invite")
  async def get_invites(token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)

    invites_db = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM users WHERE id IN (SELECT id FROM friend_invites WHERE friend_id=?)", (user_google.google_id,)).fetchall()
    )

    invites = []
    for invite_db in invites_db:
      profile_picture_base64 = decode_picture(invite_db[3])
      invites.append({
        "id": invite_db[0],
        "email": invite_db[1],
        "nickname": invite_db[2],
        "profilePicture": profile_picture_base64,
      })

    return invites
  
  @app.post("/friend/invite/{friend_id}")
  async def invite_friend(friend_id: str, token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)

    existing_friend = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM user_friends WHERE id=? AND friend_id=?", (user_google.google_id, friend_id,)).fetchone()
    )

    if existing_friend:
      return {"status": "exists"}

    existing_invite = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM friend_invites WHERE id=? AND friend_id=?", (user_google.google_id, friend_id)).fetchone()
    )

    if existing_invite:
      return {"status": "exists"}

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO friend_invites VALUES (?, ?)", (user_google.google_id, friend_id))
    )

    return {"status": "success"}

  @app.post("/friend/accept/{friend_id}")
  async def accept_friend(friend_id: str, token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)

    has_invite = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM friend_invites WHERE id=? AND friend_id=?", (friend_id, user_google.google_id)).fetchone()
    ) is not None

    if not has_invite:
      return {"status": "not_found"}
    
    db_execute(lambda cursor:
      cursor.execute("DELETE FROM friend_invites WHERE id=? AND friend_id=?", (friend_id, user_google.google_id))
    )

    existing_friendship = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM user_friends WHERE id=? AND friend_id=?", (user_google.google_id, friend_id)).fetchone()
    )

    if existing_friendship:
      return {"status": "exists"}

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO user_friends VALUES (?, ?)", (user_google.google_id, friend_id))
    )

    db_execute(lambda cursor:
      cursor.execute("INSERT INTO user_friends VALUES (?, ?)", (friend_id, user_google.google_id))
    )

    return {"status": "success"}

  @app.delete("/friend/{friend_id}")
  async def delete_friend(friend_id: str, token: str=Depends(oauth2_scheme)):
    user_google = await get_current_user(token)

    existing_friendship = db_execute(lambda cursor:
      cursor.execute("SELECT * FROM user_friends WHERE id=? AND friend_id=?", (user_google.google_id, friend_id)).fetchone()
    )

    if existing_friendship is None:
      return {"status": "not_found"}

    db_execute(lambda cursor:
      cursor.execute("DELETE FROM user_friends WHERE id=? AND friend_id=?", (user_google.google_id, friend_id))
    )

    return {"status": "success"}