from ..models import db, Friendship

def seed_friends():
  friendship1 = Friendship(
    user1_id = 1, user2_id = 2, status="accepted"
  )
  friendship2 = Friendship(
    user1_id = 1, user2_id = 3, status="pending"
  )
  friendship3 = Friendship(
    user1_id = 2, user2_id = 3, status="accepted"
  )
  db.session.add(friendship1)
  db.session.add(friendship2)
  db.session.add(friendship3)

  db.session.commit()

def undo_friends():
  db.session.execute('TRUNCATE friendships RESTART IDENTITY CASCADE;')
  db.session.commit()
