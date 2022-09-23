from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
# img url, userId, caption

class ImageForm(FlaskForm):
  post_id = IntegerField("Post_id")
  user_id = IntegerField("User_id")
  image_url = StringField("Image Url", validators=[DataRequired()])
