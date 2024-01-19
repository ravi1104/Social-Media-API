# Social Media API

This is the backend REST API for a Social Media application, allowing users to post, comment, like, send friend requests, and reset passwords using OTP for enhanced security.

[Live link](https://frail-life-jacket-frog.cyclic.app/api-docs/)


## Table of Contents

- [Description](#description)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description

This API provides the backend functionality for a Social Media application. Users can register, login, post content, interact with posts, manage friend requests, and reset their passwords securely.

## API Documentation

The API documentation is available in OpenAPI format. You can view it [here](https://frail-life-jacket-frog.cyclic.app/api-docs/).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ravi1104/Social-Media-API.git

## Endpoints

### User Routes:

- `/user/register`: Register a new user.
- `/user/login`: User login and JWT token generation.
- `/user/logoutalldevices`: Logout from all devices.
- `/user/resetPass`: Reset password using OTP.

### Post Routes:

- `/post/addPost`: Add a new post.
- `/post/updatePost/{postId}`: Update an existing post.
- `/post/deletePost/{postId}`: Delete an existing post.
- `/post/allPost/{postId}`: Retrieve all posts.

### Comment Routes:

- `/comment/addComment`: Add a new comment.
- `/comment/updateComment/{commentId}`: Update an existing comment.
- `/comment/deleteComment/{commentId}`: Delete an existing comment.
- `/comment/allComments/{postId}`: Retrieve all comments for a post.

### Like Routes:

- `/like/likePost/{postId}`: Like a post.
- `/like/unlikePost/{postId}`: Unlike a post.
- `/like/getLikes/{postId}`: Retrieve likes for a post.

### Friend Routes:

- `/friend/sendRequest`: Send a friend request.
- `/friend/approveRequest`: Approve a friend request.
- `/friend/removeFriend/{friendId}`: Remove a friend.
