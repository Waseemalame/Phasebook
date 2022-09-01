from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment
from app.forms import CommentForm
from flask_login import current_user

comment_routes = Blueprint("comments", __name__, url_prefix="/comments")

@comment_routes.route("/")
def all_comments():
  if current_user:
    all_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in all_comments]
    response = { "comments": comments }
    return response
  else:
    return "Unauthorized"
