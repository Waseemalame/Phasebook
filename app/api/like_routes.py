from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment, Like
from app.forms import LikeForm
from flask_login import current_user

like_routes = Blueprint("likes", __name__, url_prefix="/likes")

@like_routes.route("")
def get_posts_likes():
  if current_user:
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}
  else:
    return "Unauthorized"
