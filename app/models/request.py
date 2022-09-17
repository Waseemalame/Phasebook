from .db import db



class FriendRequest(db.Model):
  __tablename__ = "friendRequests"

  id = db.Column(db.Integer, primary_key=True)
  status = db.Column("status", db.String, nullable=False)
  sender_id = db.Column("sender_id", db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  recipient_id = db.Column("recipient_id", db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)

  req_sender = db.relationship("User",
                          foreign_keys=[sender_id],
                          back_populates="sender"
                          )

  req_recipient = db.relationship("User",
                              foreign_keys=[recipient_id],
                              back_populates="recipient",
                          )


  def to_dict(self):
    return {
        'id': self.id,
        'status': self.status,
        'sender_id': self.sender_id,
        'recipient_id': self.recipient_id
    }
