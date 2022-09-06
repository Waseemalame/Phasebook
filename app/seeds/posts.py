from ..models import db, Post


# Adds demo posts
def seed_posts():
    demo1 = Post(
        content="Selling laptops comment below if interested", user_id=1)
    demo2 = Post(
        content="Learning how to bake any tips?", user_id=2)
    demo3 = Post(
        content="Comment below if interested in a software engineering role.", user_id=3)
    demo4 = Post(
        content='“We are what we repeatedly do. Excellence, then, is not an act, but a habit” - Aristotle', user_id=1)
    demo5 = Post(
        content="I want to travel can someone help me decide where to go first?", user_id=2)


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
