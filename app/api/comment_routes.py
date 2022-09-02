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

@comment_routes.route("/<comment_id>", methods=["PUT"])
def edit_comment(comment_id):

    comment = Comment.query.get(comment_id)

    updated_comment = CommentForm()

    updated_comment['csrf_token'].data = request.cookies['csrf_token']
    comment_content = updated_comment.data["comment_content"]
    user_id = updated_comment.data["user_id"]
    post_id = updated_comment.data["post_id"]

    if current_user.id == comment.user_id:
        comment.comment_content = comment_content
        comment.user_id = user_id
        comment.post_id = post_id
        db.session.commit()
        return comment.to_dict()
    else:
         return '404: unauthorized user'
