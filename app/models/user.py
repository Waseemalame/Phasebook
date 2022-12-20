from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, Table, Column, ForeignKey, String, select
from sqlalchemy.schema import UniqueConstraint
from flask_login import UserMixin






class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    profile_image_url = db.Column(db.String())
    profile_banner_url = db.Column(db.String())


    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    images = db.relationship('Image', back_populates='user')
    sender = db.relationship("FriendRequest",
                            foreign_keys="[FriendRequest.sender_id]",
                            back_populates="req_sender",
                            cascade='all, delete-orphan',
                            passive_deletes=True
                            )

    recipient = db.relationship("FriendRequest",
                            foreign_keys="[FriendRequest.recipient_id]",
                            back_populates="req_recipient",
                            cascade='all, delete-orphan',
                            passive_deletes=True
                            )
    like_list = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")


    # msg_sender = db.relationship("Message",
    #                         foreign_keys=[id],
    #                         back_populates='sent_msg'
    #                         )
    # msg_recipient = db.relationship("Message",
    #                         foreign_keys=[id],
    #                         back_populates='received_msg'
    #                         )

    messages_sent = db.relationship("Message",
                          foreign_keys="[Message.msg_sender_id]",
                          back_populates='msg_sender'
                          )
    messages_received = db.relationship("Message",
                          foreign_keys='[Message.msg_recipient_id]',
                          back_populates='msg_recipient'
                          )
    def __repr__(self):
        return "User(%r)" % User




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
            'profile_banner_url': self.profile_banner_url,
            'images': [image.to_dict() for image in self.images],
            "like_list": [like.to_dict() for like in self.like_list],
        }
