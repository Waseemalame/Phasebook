from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from flask_login import current_user

from app.models.request import FriendRequest


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<user_id>/friends')
@login_required
def users_friends(user_id):
    users_friends = User.query.join(FriendRequest,
    (FriendRequest.recipient_id == User.id) | (FriendRequest.sender_id == User.id)).filter(
    (FriendRequest.sender_id == user_id) | (FriendRequest.recipient_id == user_id)
    ).filter(FriendRequest.status == 'accepted').filter(User.id != user_id).all()

    return {'friends': [friend.to_dict() for friend in users_friends]}

@user_routes.route('/mutualfriends/<user_id>')
@login_required
def mutual_friends(user_id):

    current_user_friends = User.query.join(FriendRequest,
    (FriendRequest.recipient_id == User.id) | (FriendRequest.sender_id == User.id)).filter(
    (FriendRequest.sender_id == current_user.id) | (FriendRequest.recipient_id == current_user.id)
    ).filter(FriendRequest.status == 'accepted').filter(User.id != current_user.id).all()


    users_friends = User.query.join(FriendRequest,
    (FriendRequest.recipient_id == User.id) | (FriendRequest.sender_id == User.id)).filter(
    (FriendRequest.sender_id == user_id) | (FriendRequest.recipient_id == user_id)
    ).filter(FriendRequest.status == 'accepted').filter(User.id != user_id).all()

    friend_arr = []
    for friend in current_user_friends:
        for user_friend in users_friends:
            if friend.to_dict() == user_friend.to_dict():
                print(friend.to_dict())
                friend_arr.append(friend)
    return {'users': [user.to_dict() for user in friend_arr]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
