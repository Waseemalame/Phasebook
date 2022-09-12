# Phasedbook

Phasedbook is a website built for users to socialize and connect from all around the world by creating posts and commenting on posts.

## Tech Stack
* JavaScript
* React
* Redux
* Python
* HTML 5
* CSS3

### Database
* SQLite

### Hosting
* Docker
* Heroku

## Heroku Live Link
https://phasedbook.herokuapp.com/

## Features
* Read, create, update, and delete Posts
* Read, create, update, and delete Comments
* View users' profile pages to display a list of posts created by the owner of the profile page


## Login Page
![image](https://user-images.githubusercontent.com/73668892/189577478-79e86cb9-c799-48d5-93b9-b799a79b45a9.png)

## Signup Page
![image](https://user-images.githubusercontent.com/73668892/189577593-2d122982-70ff-4cf3-8562-c3cc9723717a.png)

## Feed Page
![image](https://user-images.githubusercontent.com/73668892/189577316-0696c5d1-0751-4b41-971d-fff388508f4b.png)

## Create Post Form
![image](https://user-images.githubusercontent.com/73668892/189577835-0377f8a4-1bfc-4893-9517-19fc5e3002b0.png)

## Edit Post Form
![image](https://user-images.githubusercontent.com/73668892/189577879-962c027f-64d4-4af3-b823-e36ef4a43390.png)



## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/Waseemalame/Phasebook.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
            DATABASE_URL=<<insert_database_url>>
            SECRET_KEY=<<generate_strong_secret_key>>
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<br>

## To-do List
 * Friends functionality
 * Upload Profile Image
 * Google Maps API
 * Search Bar
 * Likes




