from ..models import db, Image

# Adding images
def seed_images():
  image1 = Image(
    image_url = "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=907&q=80", post_id = 1
  )
  image2 = Image(
    image_url = "https://images.unsplash.com/photo-1588467850695-a898367ce465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFraW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60", post_id = 2
  )
  image3 = Image(
    image_url = "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c29mdHdhcmUlMjBlbmdpbmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60", post_id = 3
  )
  image4 = Image(
    image_url = "https://images.unsplash.com/photo-1574626647213-a5cc26f91021?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2lzZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60", post_id = 4
  )
  image5 = Image(
    image_url = "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60", post_id = 5
  )
  image6 = Image(
    image_url = "https://i.imgur.com/eqXiAMA.jpg", post_id = 6
  )
  image7 = Image(
    image_url = "https://i.imgur.com/QNXyYw5.jpg", post_id = 7
  )
  image8 = Image(
    image_url = "https://i.imgur.com/0FCxZSC.jpg", post_id = 8
  )
  image9 = Image(
    image_url = "https://i.imgur.com/j5X0DvE.jpg", post_id = 9
  )
  image10 = Image(
    image_url = "https://i.imgur.com/jfzGqHv.jpg", post_id = 10
  )

  db.session.add(image1)
  db.session.add(image2)
  db.session.add(image3)
  db.session.add(image4)
  db.session.add(image5)
  db.session.add(image6)
  db.session.add(image7)
  db.session.add(image8)
  db.session.add(image9)
  db.session.add(image10)

  db.session.commit()

def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
  db.session.commit()
