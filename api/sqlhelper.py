import sqlite3
import atexit

create_blink_table = """
CREATE TABLE IF NOT EXISTS blink (
  id INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('active', 'inactive', 'blink'))
);
"""

create_user_table = """
CREATE TABLE IF NOT EXISTS user (
  google_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL
);
"""

def init_db():
  connection = sqlite3.connect('data.db')
  cursor = connection.cursor()

  cursor.execute(create_blink_table)
  cursor.execute(create_user_table)
  connection.commit()

  cursor.close()
  connection.close()

def new_connection():
  connection = sqlite3.connect('data.db')
  cursor = connection.cursor()

  return connection, cursor

def get_db():
  connection, cursor = new_connection()
  try:
    yield cursor
  finally:
    cursor.close()
    connection.commit()
    connection.close()