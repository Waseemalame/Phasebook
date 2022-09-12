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
    demo6 = Post(
        content="I want this home!", user_id=4)
    demo7 = Post(
        content="I'm a professional photographer if anyone is interested!", user_id=5)
    demo8 = Post(
        content="Looking into buying Phasedbook soon if the developer accepts Doge Coin", user_id=6)
    demo9 = Post(
        content="I'm fascinated by how fast technology is progressing!.", user_id=3)
    demo10 = Post(
        content="If anyone has any puppies I'd love to take them off your hands!", user_id=2)





    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
