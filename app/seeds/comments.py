from ..models import db, Comment

def seed_comments():
    demo1 = Comment(
        comment_content="I can't agree more", user_id=2, post_id=1)
    demo2 = Comment(
        comment_content="Test seed data", user_id=1, post_id=2)
    demo3 = Comment(
        comment_content="I'm posting a comment", user_id=2, post_id=3)
    demo4 = Comment(
        comment_content="This is my comment", user_id=3, post_id=4)
    demo5 = Comment(
        comment_content="This is also my comment", user_id=3, post_id=5)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
