from app.models import db, User, FriendRequest


def seed_friends():
  friendship1 = FriendRequest(
    sender_id = 1, recipient_id = 2, status="accepted"
  )
  friendship2 = FriendRequest(
    sender_id = 1, recipient_id = 3, status="pending"
  )
  friendship3 = FriendRequest(
    sender_id = 2, recipient_id = 3, status="accepted"
  )
  friendship4 = FriendRequest(
    sender_id = 1, recipient_id = 4, status="accepted"
  )
  friendship5 = FriendRequest(
    sender_id = 1, recipient_id = 5, status="accepted"
  )
  friendship6 = FriendRequest(
    sender_id = 4, recipient_id = 5, status="accepted"
  )
  db.session.add(friendship1)
  db.session.add(friendship2)
  db.session.add(friendship3)
  db.session.add(friendship4)
  db.session.add(friendship5)
  db.session.add(friendship6)

  db.session.commit()

def undo_friends():
  db.session.execute('TRUNCATE friendships RESTART IDENTITY CASCADE;')
  db.session.commit()
