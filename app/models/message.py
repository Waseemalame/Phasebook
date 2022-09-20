from .db import db
from sqlalchemy import func
class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  msg_sender_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  msg_recipient_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  msg_body = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())

  # sent_msg = db.relationship("User", foreign_keys="[User.id]", back_populates="msg_sender")
  # received_msg = db.relationship("User", foreign_keys="[User.id]", back_populates="msg_recipient")

  msg_sender = db.relationship("User", foreign_keys=[msg_sender_id], back_populates="msg_sender")
  msg_recipient = db.relationship("User", foreign_keys=[msg_recipient_id], back_populates="msg_recipient")

  def to_dict(self):
    return {
    'id': self.id,
    'msg_sender_id': self.msg_sender_id,
    'msg_recipient_id': self.msg_recipient_id,
    'msg_body': self.msg_body,
    'created_at': self.created_at,
    'updated_at': self.updated_at
    }
