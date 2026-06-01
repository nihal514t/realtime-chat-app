# MERN Realtime Chat Application

A full stack realtime chat application built with the MERN stack, featuring authentication, private messaging, online presence, typing indicators, and message delivery tracking similar to modern messaging platforms.

## Features

### Authentication

* JWT Authentication
* User Registration
* User Login
* Protected Routes
* Persistent Login Sessions

### Realtime Messaging

* One to One Private Chats
* Socket.IO Realtime Communication
* Instant Message Delivery
* Automatic Message Synchronization

### Message Status

* Sent Status
* Delivered Status
* Seen Status
* Offline Message Delivery Sync

### User Presence

* Online User Tracking
* Live Online Indicators
* User Connection Monitoring

### Chat Experience

* Typing Indicators
* Auto Scroll to Latest Message
* Message Timestamps
* Responsive Chat Interface
* Active Chat Highlighting

### Unread Messages

* Unread Message Counting
* Read Tracking
* Seen Message Tracking

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Socket.IO Client
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose

## Project Structure

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── MessageArea.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Chat.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   └── services/
│       ├── authService.js
│       ├── userService.js
│       ├── messageService.js
│       └── socketService.js

backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── socket/
└── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/nihal514t/realtime-chat-app.git
cd chat-app
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

```env
PORT=8000
MONGO_URI=
JWT_SECRET=
```

## Implemented Features

* User Authentication
* Protected Routes
* Persistent Login
* Realtime Messaging
* Online Users
* Typing Indicators
* Sent Status
* Delivered Status
* Seen Status
* Unread Message Counts
* Message Timestamps
* Auto Scroll
* Socket.IO Integration

## Future Improvements

* Last Message Preview
* Message Notifications
* User Avatars
* Image Sharing
* File Sharing
* Group Chats
* Voice Messages
* Message Reactions
* Chat Search
* Message Deletion
* Dark Mode

## Author

Muhammed Nihal

## License

This project is licensed for educational and portfolio purposes.
