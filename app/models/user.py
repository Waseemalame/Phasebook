from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, Table, Column, ForeignKey, String, select
from sqlalchemy.schema import UniqueConstraint
from flask_login import UserMixin


request = db.Table("requests",
                        db.Column('sender_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('recipient_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('status', db.String),
                        UniqueConstraint('sender_id', 'recipient_id', name='unique_friendships')
                        )



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    profile_image_url = db.Column(db.String())


    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    friends = relationship("User", secondary=request,
                        primaryjoin=id==request.c.sender_id,
                        secondaryjoin=id==request.c.recipient_id,
    )

    def befriend(self, friend):
        if friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)

    def unfriend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)
            friend.friends.remove(self)

    def __repr__(self):
        return "User(%r)" % User


    requests = db.relationship('User',
                               secondary=request,
                               primaryjoin=(request.c.sender_id == id),
                               secondaryjoin=(request.c.recipient_id == id),
                            #    backref=db.backref("requests", uselist=False),
                            #    lazy='dynamic'
                               )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_image_url': self.profile_image_url,
            'friends': self.friends,
            'requests': self.requests
        }

class FriendRequest(db.Model):
  __tablename__ = "friendRequests"

  id = db.Column(db.Integer, primary_key=True)
  status = db.Column("status", db.String, nullable=False)
  sender_id = db.Column("sender_id", db.Integer, db.ForeignKey('users.id'))
  recipient_id = db.Column("recipient_id", db.Integer, db.ForeignKey("users.id"))
#   sender = db.relationship
  friends = relationship("User", secondary=request,
                      primaryjoin=id==request.c.sender_id,
                      secondaryjoin=id==request.c.recipient_id,
                      backref=db.backref("users", uselist=False),
  )


  def to_dict(self):
    return {
        'id': self.id,
        'status': self.status,
        'sender_id': self.sender_id,
        'recipient_id': self.recipient_id
    }
