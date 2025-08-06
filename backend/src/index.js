import "./config/env.js";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
      },
    });

    // Map to track users in each note room
    const noteUsers = {};

    io.on("connection", (socket) => {
      socket.on("join_note", (noteId) => {
        socket.join(noteId);
        noteUsers[noteId] = noteUsers[noteId] || new Set();
        noteUsers[noteId].add(socket.id);
        // active users
        io.to(noteId).emit("active_users", noteUsers[noteId].size);
      });

      socket.on("note_update", ({ noteId, content }) => {
        socket.to(noteId).emit("note_update", content);
      });

      socket.on("leave_note", (noteId) => {
        socket.leave(noteId);
        if (noteUsers[noteId]) {
          noteUsers[noteId].delete(socket.id);
          io.to(noteId).emit("active_users", noteUsers[noteId].size);
        }
      });

      socket.on("disconnecting", () => {
        for (const noteId of socket.rooms) {
          if (noteUsers[noteId]) {
            noteUsers[noteId].delete(socket.id);
            io.to(noteId).emit("active_users", noteUsers[noteId].size);
          }
        }
      });
    });

    server.listen(PORT, () => {
      console.log("server started at", PORT);
    });
  } catch (error) {
    console.log("server did not started", error);
  }
};

startServer();
