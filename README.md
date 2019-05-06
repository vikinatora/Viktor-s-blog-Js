# My project for JS-Web course for Softuni using React as a mandatory front-end library, node.js(expess.js) for the backend and MongoDb.

## Introduction
### Viktor's blog SPA web app is a project as a mandatory exam requirement for the course "React Fundamentals February 2019" by SoftUni.
## Description
This project is a personal blog where only the **admin** can create posts and other users can **comment** and **reply** to each other with dynamically generated categories dropdown menu. **User**s can **search posts** by category using the dropdown menu or with their own search query using **search form**.
The admin can access admin-only panel in which he can edit and delete posts.

## The public part is visible without authentication. It consists of:
* Landing page with all the posts from the creator.
* Use the search form
* Registration form
* Login form

## After successful login, registered users can access:
* Leave comments under posts
* Reply to comments
* Upvote and downvote other user's comments

## The admin has administrative access to the system after successful login. In addition to all regular user abilities he has the following:
* Rights to create posts
* Rights to create categories
* Rights to delete every comment he doesn't find fitting
* Special admin page for managing all posts with options to delete and edit them
* **Admin functionality can be tested by logging in with admin@admin.com as username and 12345678 as password by default(can be changed in User.js in the Server folder)

## Setting up
### Server:

Install the dependencies in Server with `npm install`

Start the server with `node index` (on localhost:5000 by default)

### Client

Install the dependencies in blog with `npm install`

Start the client with `npm start` (on localhost:4200 by default)


