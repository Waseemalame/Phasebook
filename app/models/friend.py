from .db import db

class Friendship(db.Model):
  __tablename__ = 'friendships'

  id = db.Column(db.Integer, primary_key=True)
  user1_id = db.Column("user1_id", db.Integer, db.ForeignKey('users.id'), nullable=False)
  user2_id = db.Column("user2_id", db.Integer, db.ForeignKey('users.id'), nullable=False)
  status = db.Column("status", db.String, nullable=False)


  # user = db.relationship("User", back_populates="friendships", primaryjoin="User.id==Friendship.user1_id", foreign_keys=[user1_id, user2_id])
  # user = db.relationship("User", back_populates="users", foreign_keys=[user1_id, user2_id])

  def to_dict(self):
    return {
      'id': self.id,
      # "users": [user.to_dict() for user in self.user],
      'user1_id': self.user1_id,
      'user2_id': self.user2_id,
      'status': self.status
    }
