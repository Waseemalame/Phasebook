from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment, Message
from app.forms import MessageForm
from flask_login import current_user

message_routes = Blueprint("messages", __name__, url_prefix="/messages")


@message_routes.route('/<userId>', methods=["GET"])
def get_messages(userId):
  user = User.query.get(userId)
  users_messages = Message.query.join(User,
    (User.id == Message.msg_recipient_id) | (User.id == Message.msg_sender_id)).filter(
      (Message.msg_recipient_id == current_user.id) | (Message.msg_sender_id == current_user.id)
    ).filter(
      (Message.msg_recipient_id == userId) | (Message.msg_sender_id == userId)
    ).all()


  return {'messages': [message.to_dict() for message in users_messages]}

@message_routes.route('')
def get_all_messages():

  all_messages = Message.query.join(User,
    (User.id == Message.msg_recipient_id) | (User.id == Message.msg_sender_id)).filter(
    (Message.msg_recipient_id == current_user.id) | (Message.msg_sender_id == current_user.id)
    )
  return {'all_messages': [message.to_dict() for message in all_messages]}

@message_routes.route('/', methods=["POST"])
def create_message():
  new_message = MessageForm()
  msg_sender_id = new_message.data['msg_sender_id']
  msg_recipient_id = new_message.data['msg_recipient_id']
  msg_body = new_message.data['msg_body']

  message = Message(
    msg_sender_id = msg_sender_id,
    msg_recipient_id = msg_recipient_id,
    msg_body = msg_body
  )

  db.session.add(message)
  db.session.commit()
  return message.to_dict()
