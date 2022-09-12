from .db import db

class Friendrequest(db.Model):
  __tablename__ = 'friend_requests'

  id = db.Column(db.Integer, primary_key=True)
  friender_id = db.Column()
