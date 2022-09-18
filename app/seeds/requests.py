from app.models import db, User, FriendRequest

# Adding friends
def seed_friends():
  friendship1 = FriendRequest(
    sender_id = 1, recipient_id = 2, status="accepted"
  )
  friendship2 = FriendRequest(
    sender_id = 1, recipient_id = 3, status="accepted"
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
  friendship7 = FriendRequest(
    sender_id = 3, recipient_id = 5, status="accepted"
  )
  friendship8 = FriendRequest(
    sender_id = 1, recipient_id = 7, status="accepted"
  )
  friendship9 = FriendRequest(
    sender_id = 1, recipient_id = 8, status="accepted"
  )
  friendship10 = FriendRequest(
    sender_id = 1, recipient_id = 9, status="accepted"
  )
  friendship11 = FriendRequest(
    sender_id = 1, recipient_id = 10, status="accepted"
  )
  friendship12 = FriendRequest(
    sender_id = 1, recipient_id = 11, status="accepted"
  )
  friendship13 = FriendRequest(
    sender_id = 1, recipient_id = 12, status="pending"
  )
  friendship14 = FriendRequest(
    sender_id = 1, recipient_id = 13, status="accepted"
  )
  friendship15 = FriendRequest(
    sender_id = 2, recipient_id = 4, status="accepted"
  )
  friendship16 = FriendRequest(
    sender_id = 2, recipient_id = 6, status="pending"
  )
  friendship17 = FriendRequest(
    sender_id = 2, recipient_id = 7, status="accepted"
  )
  friendship18 = FriendRequest(
    sender_id = 2, recipient_id = 8, status="accepted"
  )
  friendship19 = FriendRequest(
    sender_id = 2, recipient_id = 10, status="pending"
  )
  friendship20 = FriendRequest(
    sender_id = 2, recipient_id = 11, status="accepted"
  )
  friendship21 = FriendRequest(
    sender_id = 7, recipient_id = 5, status="accepted"
  )
  friendship22 = FriendRequest(
    sender_id = 7, recipient_id = 6, status="pending"
  )
  friendship23 = FriendRequest(
    sender_id = 7, recipient_id = 8, status="accepted"
  )
  friendship24 = FriendRequest(
    sender_id = 7, recipient_id = 9, status="pending"
  )
  friendship25 = FriendRequest(
    sender_id = 7, recipient_id = 10, status="accepted"
  )
  friendship26 = FriendRequest(
    sender_id = 7, recipient_id = 11, status="accepted"
  )
  friendship27 = FriendRequest(
    sender_id = 12, recipient_id = 2, status="accepted"
  )
  friendship28 = FriendRequest(
    sender_id = 12, recipient_id = 3, status="accepted"
  )
  friendship29 = FriendRequest(
    sender_id = 12, recipient_id = 6, status="accepted"
  )
  friendship30 = FriendRequest(
    sender_id = 12, recipient_id = 7, status="accepted"
  )
  friendship31 = FriendRequest(
    sender_id = 12, recipient_id = 8, status="accepted"
  )
  db.session.add(friendship1)
  db.session.add(friendship2)
  db.session.add(friendship3)
  db.session.add(friendship4)
  db.session.add(friendship5)
  db.session.add(friendship6)
  db.session.add(friendship7)
  db.session.add(friendship8)
  db.session.add(friendship9)
  db.session.add(friendship10)
  db.session.add(friendship11)
  db.session.add(friendship12)
  db.session.add(friendship13)
  db.session.add(friendship14)
  db.session.add(friendship15)
  db.session.add(friendship16)
  db.session.add(friendship17)
  db.session.add(friendship18)
  db.session.add(friendship19)
  db.session.add(friendship20)
  db.session.add(friendship21)
  db.session.add(friendship22)
  db.session.add(friendship23)
  db.session.add(friendship24)
  db.session.add(friendship25)
  db.session.add(friendship26)
  db.session.add(friendship27)
  db.session.add(friendship28)
  db.session.add(friendship29)
  db.session.add(friendship30)
  db.session.add(friendship31)

  db.session.commit()

def undo_friends():
  db.session.execute('TRUNCATE friendships RESTART IDENTITY CASCADE;')
  db.session.commit()
