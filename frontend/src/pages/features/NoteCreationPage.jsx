import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NoteCreationPage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/notes", {
        title,
      });

      const id = response.data.note._id;

      navigate(`/note/${id}`);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Note
        </h2>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
        {loading && (
          <div className="mt-4 text-center text-gray-500">Loading...</div>
        )}
      </form>
    </div>
  );
}

export default NoteCreationPage;
