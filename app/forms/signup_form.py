from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if not email:
        raise ValidationError('Email address is required')
    elif not '@' in email or not '.' in email:
        raise ValidationError('A valid Email is required')

    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if not username:
        raise ValidationError('Username is required')
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def check_last(form, field):
    last_name = field.data
    if not last_name:
        raise ValidationError('Last name is required')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[username_exists])
    email = StringField('email', validators=[user_exists])
    first_name = StringField('First Name')
    last_name = StringField('Last Name', validators=[check_last])
    profile_image_url = StringField('Profile Image')
    password = StringField('password', validators=[DataRequired()])
