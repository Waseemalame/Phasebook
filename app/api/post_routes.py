from dis import dis
from flask import Blueprint, request, redirect
from app.models import db, Post, Comment
from app.forms import PostForm, CommentForm
from flask_login import current_user
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


# post_routes = Blueprint("home", __name__, url_prefix="/user") /posts
post_routes = Blueprint("posts", __name__, url_prefix="/posts")


@post_routes.route('/', methods=["GET"])
def user_home():
    if current_user:
        all_posts = Post.query.all()
        posts = [post.to_dict() for post in all_posts]
        response = { "posts": posts }
        return response
    else:
        return "Unauthorized"


@post_routes.route('', methods=["POST"])
def user_posts():
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
    new_post = PostForm()
    content = new_post.data['content']
    # new_post = PostForm()

    new_post['csrf_token'].data = request.cookies['csrf_token']

    user_id = new_post.data['user_id']
    image_url = new_post.data['image_url']

    print('ARE WE HERE')
    print('ARE WE HERE')
    print('ARE WE HERE')
    print('ARE WE HERE')
    print('ARE WE HERE')
    if new_post.validate_on_submit() and current_user.id == user_id:
        post = Post(
            user_id = user_id,
            content = content,
            image_url = image_url
        )
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')
        print('ARE WE HERE')

        # db.session.add(new_image)
        db.session.add(post)
        db.session.commit()
        # db.session.commit()
        return post.to_dict()
    else:
        return '403: unauthorized user'

@post_routes.route('/<post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    updated_post = PostForm()

    updated_post['csrf_token'].data = request.cookies['csrf_token']
    content = updated_post.data['content']
    image_url = updated_post.data['image_url']

    post.content = content
    post.image_url = image_url

    db.session.commit()
    return post.to_dict()





@post_routes.route("/<post_id>")
def single_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    return post.to_dict()


@post_routes.route("/<post_id>/comments", methods=['POST'])
def add_comment(post_id):
    comment_form = CommentForm()

    comment_content = comment_form.data['comment_content']
    user_id = comment_form.data['user_id']
    post_id = comment_form.data['post_id']

    comment_form['csrf_token'].data = request.cookies['csrf_token']
    if comment_form.validate_on_submit() and current_user.id == user_id:

        comment = Comment(
            comment_content=comment_content,
            user_id=user_id,
            post_id=post_id
        )

        post = Post.query.get(post_id)

        comment.post = post

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return '403: unauthorized user'


@post_routes.route("/<post_id>", methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    # if current_user.id == post.user.id:
    #     post = Post.query.get(post_id)
    # else:
    #     return '403: unauthorized user'

    db.session.delete(post)
    db.session.commit()

    return "Successfully Deleted"
