import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; 

const NoteEditorPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeUsers, setActiveUsers] = useState(1);
  const socketRef = useRef(null);
  const saveTimeout = useRef(null);

  // Fetch note on mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/api/notes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data.note?.content || "");
        } else {
          setError("Failed to load note.");
        }
      } catch (error) {
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Setup socket connection
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.emit("join_note", id);

    socketRef.current.on("note_update", (newContent) => {
      setContent(newContent);
      setLastUpdated(new Date());
    });

    socketRef.current.on("active_users", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socketRef.current.emit("leave_note", id);
      socketRef.current.disconnect();
    };
  }, [id]);

  // Auto-save every 5 seconds
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      fetch(`${SOCKET_URL}/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setLastUpdated(new Date());
    }, 5000);
    return () => clearTimeout(saveTimeout.current);
  }, [content, id]);

  // Send content to socket on change
  const handleContentChange = (value) => {
    setContent(value);
    socketRef.current.emit("note_update", { noteId: id, content: value });
  };


   const handleSave = async () => {
    try {
      await fetch(`http://localhost:4000/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      alert("Note saved successfully!");
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note.");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500 text-sm">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Never"}
          </span>
          <span className="text-blue-600 text-sm">
            Active collaborators: {activeUsers}
          </span>
        </div>
        <SimpleMDE
          value={content}
          onChange={handleContentChange}
          options={{
            spellChecker: false,
            placeholder: "Edit your note here...",
          }}
          className="w-full mb-4"
        />
       <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

    </div>
  );
};

export default NoteEditorPage;