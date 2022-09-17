from app.models import db, User, FriendRequest


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User', profile_image_url="https://avatars.githubusercontent.com/u/73668892?v=4")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='marnie', last_name='ann', profile_image_url="https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='bobby', last_name='willin', profile_image_url="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg")
    najwa = User(
        username='naj', email='najwa@aa.io', password='password', first_name='Najwa', last_name='K', profile_image_url="https://i.imgur.com/Za56zXf.jpg")
    jessica = User(
        username='jes', email='jessica@aa.io', password='password', first_name='Jessica', last_name='Cobal', profile_image_url="https://i.imgur.com/5M3eHqJ.jpg")
    elon = User(
        username='El', email='elon@aa.io', password='password', first_name='Elawn', last_name='Musk', profile_image_url="https://i.imgur.com/OU4TPeO.jpg")

  #   friendship1 = FriendRequest(
  #     sender_id = 1, recipient_id = 2, status="accepted"
  #   )
  #   friendship2 = FriendRequest(
  #     sender_id = 1, recipient_id = 3, status="pending"
  #   )
  #   friendship3 = FriendRequest(
  #     sender_id = 2, recipient_id = 3, status="accepted"
  #   )
  #   friendship4 = FriendRequest(
  #     sender_id = 1, recipient_id = 4, status="accepted"
  #   )
  #   friendship5 = FriendRequest(
  #     sender_id = 1, recipient_id = 5, status="accepted"
  #   )
  #   friendship6 = FriendRequest(
  #     sender_id = 4, recipient_id = 5, status="accepted"
  #   )
  #   friendship7 = FriendRequest(
  #   sender_id = 3, recipient_id = 5, status="accepted"
  # )

  #   demo.friends.append(marnie)
  #   marnie.friends.append(demo)
  #   demo.friends.append(bobbie)
  #   bobbie.friends.append(demo)
  #   demo.friends.append(najwa)
  #   bobbie.friends.append(marnie)
  #   bobbie.friends.append(jessica)
  #   jessica.friends.append(bobbie)
  #   marnie.friends.append(bobbie)
  #   najwa.friends.append(demo)
  #   demo.friends.append(jessica)
  #   jessica.friends.append(demo)
  #   najwa.friends.append(jessica)
  #   jessica.friends.append(najwa)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(najwa)
    db.session.add(jessica)
    db.session.add(elon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
