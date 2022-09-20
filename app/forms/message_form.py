from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    msg_sender_id = IntegerField("msg_sender_id", validators=[DataRequired()])
    msg_recipient_id = IntegerField("msg_recipient_id", validators=[DataRequired()])
    msg_body = StringField("msg_body", validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
    updated_at = DateTimeField('updated_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
