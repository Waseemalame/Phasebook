from ..models import db, Post


# Adds demo posts
def seed_posts():
    demo1 = Post(
        content="Selling laptops comment below if interested", user_id=1, image_url="https://cdn.pocket-lint.com/r/s/970x/assets/images/155087-laptops-review-microsoft-surface-laptop-go-review-image1-6ezitk9ymj.jpg")
    demo2 = Post(
        content="Learning how to bake any tips?", user_id=2, image_url="https://thumbs.dreamstime.com/b/baking-hands-kneading-raw-dough-pastry-bowl-cook-s-wheat-butter-eggs-flour-sugar-around-kitchen-scenery-above-114145412.jpg")
    demo3 = Post(
        content="Comment below if interested in a software engineering role.", user_id=3, image_url="https://www.theladders.com/wp-content/uploads/coder_190517.jpg")
    demo4 = Post(
        content='“We are what we repeatedly do. Excellence, then, is not an act, but a habit” - Aristotle', user_id=1, image_url="https://preview.redd.it/js4r4rl5cwt51.png?width=2560&format=png&auto=webp&s=a924ddfe6b3db835b8950fd20f16b72022db7d42")
    demo5 = Post(
        content="I want to travel can someone help me decide where to go first?", user_id=2, image_url="https://cdn.mos.cms.futurecdn.net/qAkSrfvdpWmRNiFWw4CC9T.jpg")

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
