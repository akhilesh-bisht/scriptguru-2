# scriptguru-2

# Real-Time Collaborative Notes App

This is a **Real-Time Collaborative Notes App** built with a modern stack including **React**, **Tailwind CSS**, **React SimpleMDE Editor**, **Node.js**, **Express**, **MongoDB**, and **Socket.io** for real-time collaboration.

In this app, multiple users can collaborate on notes in real-time. The app features a markdown editor and allows users to create, edit, and update notes in real-time with others.




backend -   https://scriptguru-2.onrender.com
---

## Table of Contents

- [Installation](#installation)
- [How to Use](#how-to-use)
- [Tech Stack](#tech-stack)
- [Collaborative Features](#collaborative-features)
- [Project Structure](#project-structure)
- [License](#license)

---

## Installation

Follow these steps to get your development environment set up.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/real-time-collaborative-notes-app.git
cd real-time-collaborative-notes-app
2. Backend Setup
Go to the backend directory and install the necessary dependencies.

bash
Copy
Edit
cd backend
npm install
3. Frontend Setup
Go to the frontend directory and install the necessary dependencies.

bash
Copy
Edit
cd frontend
npm install
4. Create Environment Variables
Create a .env file in the backend directory with the following:

env
Copy
Edit
MONGO_URI=your_mongo_db_connection_string
PORT=5000
SOCKET_PORT=5001
For the MongoDB URI, you can use MongoDB Atlas or your local MongoDB instance.

5. Start the Application
Start the backend and frontend servers:

Backend (Server):

bash
Copy
Edit
cd backend
npm run dev
Frontend (Client):

bash
Copy
Edit
cd frontend
npm start
This will run the backend on http://localhost:4000 and the frontend on http://localhost:3000.

How to Use
Once the app is running, follow these steps to start collaborating:

Create a new note: From the home page, click on "Create Note".

Edit notes: You can edit the note content using the SimpleMDE markdown editor.

Real-Time Collaboration: Multiple users can join the same note and collaborate in real-time. Changes made by one user will be instantly reflected for all other users.

You can see who is currently editing by checking the list of collaborators displayed on the side.

Tech Stack
Frontend:

React.js

Tailwind CSS (for styling)

React SimpleMDE Editor (react-simplemde-editor)

Backend:

Node.js

Express

MongoDB (using Mongoose)

Real-Time Communication:

Socket.io

Collaborative Features
Real-Time Collaboration: Powered by Socket.io, changes made by one user are broadcast to all other connected users in real time.

Live Cursor Tracking: You can see where other collaborators are typing in the note.

Collaborators List: A list of current collaborators is shown on the side of the screen, so you know who’s working on the note with you.

Project Structure
Backend
server.js: Main entry point for the backend application.

models/Note.js: Mongoose model for the Note.

routes/notes.js: API endpoints for creating and fetching notes.

socket/: Socket.io setup for real-time updates and communication.

config/: Configuration files for environment variables, database connection, etc.

Frontend
src/App.js: Main React component for rendering the app.

src/components/Editor.js: Component for the markdown editor.

src/components/CollaboratorList.js: Displays the list of active collaborators.

src/styles/: TailwindCSS styling.

```
