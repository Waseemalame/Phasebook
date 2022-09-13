from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment, Friendship
from flask_login import current_user
from app.forms import FriendForm

# from app.forms import FriendForm

friend_routes = Blueprint('friendships', __name__, url_prefix="/friendships")

@friend_routes.route("/<user_id>")
def all_friends(user_id):
  friend_requests = Friendship.query.filter(
    (Friendship.user1_id == current_user.id) | (Friendship.user2_id == current_user.id)
    ).filter(
      Friendship.status == "pending"
      ).all()

  friendships = [friendship.to_dict() for friendship in friend_requests]
  response = {"friendships": friendships}

  return response

# @friend_routes.route("/friend-requests")
# def get_friend_requests():
#   friend_requests = Friendship.query.filter(Friendship.status == "pending").filter()
#   pending_requests = []

@friend_routes.route("/<user_id>/friends")
def get_users_friends(user_id):
  user_friends = Friendship.query.filter((user_id == Friendship.user1_id) | (user_id == Friendship.user2_id)).filter(Friendship.status == "accepted").all()

  friends = [friend.to_dict() for friend in user_friends]
  print(friends)
  print(user_id)
  response = {"friends": friends}

  return response

@friend_routes.route("/sent-requests")
def get_friend_requests():
  sent_requests = Friendship.query.filter(current_user.id == Friendship.user1_id).filter(Friendship.status == "pending")
  pending_requests = [request.to_dict() for request in sent_requests]
  response = {"pending_requests": pending_requests}
  return response


@friend_routes.route("/<user_id>/posts")
def get_friends_post(user_id):

  friends_posts = Post.query.filter(
    Friendship.status == "accepted"
  ).filter(
    user_id == Friendship.user1_id
  ).filter(
    (Post.user_id == Friendship.user2_id) | (Post.user_id == user_id)
    ).all()
  posts = [post.to_dict() for post in friends_posts]

  response = {"posts": posts}

  return response

@friend_routes.route("/", methods=["POST"])
def create_friend_request():
  new_request = FriendForm()


  new_request['csrf_token'].data = request.cookies['csrf_token']
  user1_id = new_request.data["user1_id"]
  user2_id = new_request.data["user2_id"]
  status = new_request.data["status"]
  friend_request = Friendship(
    user1_id=user1_id,
    user2_id=user2_id,
    status=status
  )
  print(dir(friend_request))


  db.session.add(friend_request)
  db.session.commit()
  return friend_request.to_dict()

@friend_routes.route('/requests/<requestId>', methods=["PUT"])
def accept_request(requestId):
  request = Friendship.query.get(requestId)
  updated_request = FriendForm()

  # updated_request['csrf_token'].data = request.cookies['csrf_token']
  user1_id = updated_request.data["user1_id"]
  user2_id = updated_request.data["user2_id"]
  status = updated_request.data["status"]

  request.user1_id = user1_id
  request.user2_id = user2_id
  request.status = status

  db.session.commit()
  return request.to_dict()

@friend_routes.route('/requests/<requestId>', methods=["DELETE"])
def delete_request(requestId):
  request = Friendship.query.get(requestId)
  db.session.delete(request)
  db.session.commit()

  return "Successfully Deleted"
