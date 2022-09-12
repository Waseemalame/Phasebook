from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class FriendForm(FlaskForm):
    user1_id = IntegerField("user1_id", validators=[DataRequired()])
    user2_id = IntegerField("user2_id", validators=[DataRequired()])
    status = StringField("status", validators=[DataRequired()])
