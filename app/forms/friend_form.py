from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class FriendForm(FlaskForm):
    sender_id = IntegerField("sender_id", validators=[DataRequired()])
    recipient_id = IntegerField("recipient_id", validators=[DataRequired()])
    status = StringField("status", validators=[DataRequired()])
