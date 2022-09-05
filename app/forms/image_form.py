from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
# img url, userId, caption

class ImageForm(FlaskForm):
  post_id = IntegerField("Post_id", validators=[DataRequired()])
  image_url = StringField("Image Url", validators=[DataRequired()])
