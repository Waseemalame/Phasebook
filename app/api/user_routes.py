from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from flask_login import current_user


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/mutualfriends/<user_id>')
@login_required
def user_friends(user_id):
    user = User.query.get(user_id)

    friend_arr = []
    for friend in current_user.friends:
        for user_friend in user.friends:
            if friend.to_dict() == user_friend.to_dict():
                print(friend.to_dict())
                friend_arr.append(friend)
    return {'users': [user.to_dict() for user in friend_arr]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
