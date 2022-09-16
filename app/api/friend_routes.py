
from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment, FriendRequest
from flask_login import current_user
from app.forms import FriendForm


friend_routes = Blueprint('requests', __name__, url_prefix="/requests")

@friend_routes.route('')
def all_requests():
  friend_requests = FriendRequest.query.filter((FriendRequest.sender_id == current_user.id) | (FriendRequest.recipient_id == current_user.id))
  requests = [request.to_dict() for request in friend_requests]
  return {'all_requests': requests}

@friend_routes.route('/profile/<user_id>')
def one_request(user_id):
  friend_request = FriendRequest.query.filter((FriendRequest.sender_id == current_user.id) | (FriendRequest.recipient_id == current_user.id)).filter((FriendRequest.sender_id == user_id) | (FriendRequest.recipient_id == user_id))
  request = [request.to_dict() for request in friend_request]
  return { 'one_request': request }

@friend_routes.route("", methods=["POST"])
def create_friend_request():
  new_request = FriendForm()
  new_request['csrf_token'].data = request.cookies['csrf_token']

  recipient_id = new_request.data["recipient_id"]
  status = new_request.data["status"]

  friend_request = FriendRequest(
    sender_id=current_user.id,
    recipient_id=recipient_id,
    status=status
  )

  db.session.add(friend_request)
  db.session.commit()
  return {'one_request': friend_request.to_dict()}

@friend_routes.route('/<requestId>', methods=["PUT"])
def accept_request(requestId):
  request = FriendRequest.query.get(requestId)
  updated_request = FriendForm()

  # updated_request['csrf_token'].data = request.cookies['csrf_token']
  sender_id = updated_request.data["sender_id"]
  recipient_id = updated_request.data["recipient_id"]
  status = updated_request.data["status"]

  request.sender_id = sender_id
  request.recipient_id = recipient_id
  request.status = status

  sender = User.query.get(sender_id)
  recipient = User.query.get(recipient_id)
  current_user.friends.append(sender)
  sender.friends.append(current_user)
  db.session.commit()
  return request.to_dict()

@friend_routes.route('/<requestId>', methods=["DELETE"])
def delete_request(requestId):
  request = FriendRequest.query.get(requestId)
  sender = User.query.get(request.sender_id)
  recipient = User.query.get(request.recipient_id)
  for friend in recipient.friends:
    if(friend.id == sender.id):
      idx = recipient.friends.index(sender)
      recipient.friends.pop(idx)
  for friend in sender.friends:
    if(friend.id == recipient.id):
      idx = sender.friends.index(recipient)
      sender.friends.pop(idx)
  db.session.delete(request)
  db.session.commit()

  return "Successfully Deleted"
