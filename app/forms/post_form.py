from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateTimeField
from wtforms.validators import DataRequired

# img url, userId, content

class PostForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  image_url = StringField("Image_url")
  content = StringField("Content", validators=[DataRequired()])
  created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S")
  updated_at = DateTimeField('updated_at', format="%Y-%m-%d %H:%M:%S")
