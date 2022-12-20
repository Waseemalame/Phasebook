from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Post(db.Model):
    __tablename__ = 'posts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    display_comments = db.Column(db.Boolean, default=True)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates="post", cascade="all, delete-orphan")
    like_list = db.relationship("Like", back_populates="post", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": self.user.to_dict(),
            "images": [image.to_dict() for image in self.images],
            "comments": [comment.to_dict() for comment in self.comments],
            "like_list": [like.to_dict() for like in self.like_list],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def __repr__(self):
        return f"""
            < Post ID: {self.id}\n
              content: {self.content}\n
              User: {self.user.to_dict()}\n
              Likes: {self.likes}\n
              Images: {self.images} >
            """
