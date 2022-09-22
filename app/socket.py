import os
from flask import request
from flask_socketio import SocketIO, emit, join_room, send, leave_room

if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'https://phasedbook.herokuapp.com/',
    'http://phasedbook.herokuapp.com/',
  ]
else:
  origins = '*'

socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)
@socketio.on("chat")
def handle_chat(data):
    data['jello'] = 'yellow'
    emit("chat", data, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
