from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment, Like
from app.forms import LikeForm, like_form
from flask_login import current_user

like_routes = Blueprint("likes", __name__, url_prefix="/likes")

@like_routes.route("")
def get_posts_likes():
  if current_user:
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}
  else:
    return "Unauthorized"

@like_routes.route("/one/<post_id>/<user_id>")
def get_one_post_like(post_id, user_id):
  if current_user:
    one_like = Like.query.filter((Like.user_id == user_id) & (Like.post_id == post_id)).one_or_none()
    if bool(one_like) == True:
      return one_like.to_dict()
    else:
      return {}
  else:
    return "Unauthorized"

@like_routes.route("/", methods=["POST"])
def create_post_like():
  like_form = LikeForm()
  user_id = like_form.data['user_id']
  post_id = like_form.data['post_id']

  one_like = Like.query.filter((Like.user_id == user_id) & (Like.post_id == post_id)).one_or_none()
  if bool(one_like) == True:
    return "You have already liked this post"
  else:
    like_form['csrf_token'].data = request.cookies['csrf_token']
    if like_form.validate_on_submit():
      new_like = Like(
        user_id=user_id,
        post_id=post_id
      )
      db.session.add(new_like)
      db.session.commit()
      return new_like.to_dict()

@like_routes.route('/<likeId>', methods=['DELETE'])
def delete_post_like(likeId):

  like = Like.query.get(likeId)
  db.session.delete(like)
  db.session.commit()
  return 'Successfully Deleted'
