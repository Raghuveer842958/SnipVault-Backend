# SnipVault

A collaborative code snippet manager that allows developers to save, organize, share, and discover reusable code snippets.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Zod Validation
* Express Rate Limit

### Frontend

* React.js
* Redux Toolkit
* RTK Query
* Tailwind CSS
* DaisyUI

---

## Features

### Authentication

* User Registration
* User Login
* User Logout
* Protected Routes using JWT
* Password Hashing with bcrypt

### Snippets

* Create Snippet
* Get All User Snippets
* Get Single Snippet
* Update Snippet
* Delete Snippet
* Public/Private Visibility
* Tags Support

### Likes

* Like Snippet
* Unlike Snippet

### Comments

* Add Comment
* View Comments
* Delete Own Comments

### Folders

* Create Folder
* Rename Folder
* Delete Folder
* Nested Folder Support
* View Folder Snippets
* Move Snippet To Folder

### Explore

* Public Snippet Discovery
* Search By Title
* Search By Tags
* Language Filtering
* Sorting
* Pagination

### Dashboard

* Total Snippets
* Total Likes Received
* Total Folders
* Recent Snippets

### Profile

* Update Name
* Update Avatar

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd snipvault
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Environment Variables

### Backend

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/snipvault

JWT_SECRET=your_secret_key

NODE_ENV=development
```

---

## API Documentation

### Auth

| Method | Endpoint           | Protected |
| ------ | ------------------ | --------- |
| POST   | /api/auth/register | No        |
| POST   | /api/auth/login    | No        |
| POST   | /api/auth/logout   | Yes       |
| GET    | /api/auth/me       | Yes       |

### Users

| Method | Endpoint             | Protected |
| ------ | -------------------- | --------- |
| GET    | /api/users/dashboard | Yes       |
| PUT    | /api/users/profile   | Yes       |

### Snippets

| Method | Endpoint                  | Protected |
| ------ | ------------------------- | --------- |
| POST   | /api/snippets             | Yes       |
| GET    | /api/snippets             | Yes       |
| GET    | /api/snippets/:id         | Yes       |
| PUT    | /api/snippets/:id         | Yes       |
| DELETE | /api/snippets/:id         | Yes       |
| POST   | /api/snippets/:id/like    | Yes       |
| PUT    | /api/snippets/:id/move    | Yes       |
| GET    | /api/snippets/explore/all | Yes       |

### Comments

| Method | Endpoint                 | Protected |
| ------ | ------------------------ | --------- |
| POST   | /api/comments/:snippetId | Yes       |
| GET    | /api/comments/:snippetId | Yes       |
| DELETE | /api/comments/:commentId | Yes       |

### Folders

| Method | Endpoint                  | Protected |
| ------ | ------------------------- | --------- |
| POST   | /api/folders              | Yes       |
| GET    | /api/folders              | Yes       |
| GET    | /api/folders/:id          | Yes       |
| PUT    | /api/folders/:id          | Yes       |
| DELETE | /api/folders/:id          | Yes       |
| GET    | /api/folders/:id/snippets | Yes       |

---

## Database Schema

### User

* name
* email
* password
* avatar

### Snippet

* title
* code
* language
* description
* tags
* visibility
* createdBy
* folder
* likes

### Folder

* name
* createdBy
* parentFolder

### Comment

* text
* snippetId
* createdBy

---

## Challenges & Solutions

### Challenge

Managing relationships between snippets and folders.

### Solution

Used MongoDB references and stored folder references inside snippets to avoid data duplication.

---

### Challenge

Implementing secure authentication.

### Solution

Used JWT stored in HTTP-only cookies along with bcrypt password hashing.

---

## Future Improvements

* Real-time collaboration
* Syntax-aware snippet suggestions
* AI-powered code explanations
* Team workspaces
* Snippet version history
* Bookmarking and favorites
