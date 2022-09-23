from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

# img url, userId, content

class UserForm(FlaskForm):
  profile_image_url = StringField("Image_url")
