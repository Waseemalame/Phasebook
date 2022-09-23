from flask import Blueprint, request
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__, url_prefix="/images")

@image_routes.route("/")
def get_images():
    if current_user:

        all_images = Image.query.all()
        images = [image.to_dict() for image in all_images]
        response = {"images": images}

        return response
    else:
        return "Unauthorized"

@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]


    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    image_form = ImageForm()

    # iamge_url = image_form.data['image']
    post_id = image_form.data["post_id"]
    user_id = image_form.data["user_id"]
    image_form['csrf_token'].data = request.cookies['csrf_token']
    new_image = Image(image_url=url, post_id=post_id, user_id=user_id)
    db.session.add(new_image)
    db.session.commit()
    return {"image_url": url}

@image_routes.route("/<image_id>", methods=["DELETE"])
def delete_image(image_id):

    image = Image.query.get(image_id)

    db.session.delete(image)
    db.session.commit()

    return "Successfully Deleted"
