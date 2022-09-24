from ..models import db, Like

def seed_likes():
  like1 = Like(
    user_id=1, post_id=9
  )
  like2 = Like(
    user_id=2, post_id=9
  )
  like3 = Like(
    user_id=3, post_id=10
  )
  like4 = Like(
    user_id=1, post_id=7
  )
  like5 = Like(
    user_id=1, post_id=6
  )

  db.session.add(like1)
  db.session.add(like2)
  db.session.add(like3)
  db.session.add(like4)
  db.session.add(like5)

  db.session.commit()

def undo_likes():
  db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
  db.session.commit()
