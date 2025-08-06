import { Notes } from "../models/Notes.model.js";

// POST | /notes | Create a new note
export const createNote = async (req, res) => {
    const { title, content } = req.body;

    // Validate the data
    if (!title || !content) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if note with same title and content exists
    const existsNote = await Notes.findOne({ title, content });
    if (existsNote) {
        return res.status(409).json({ message: "Same data is already stored" });
    }

    // Save to the db
    const note = await Notes.create({ title, content });

    // Return success json
    return res.status(201).json({ message: "Successfully created", note });
};

// GET | /notes/:id | Fetch note by ID
export const getNote = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is missing" });
    }

    const note = await Notes.findById(id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note fetched successfully", note });
};

// PUT | /notes/:id | Update note content
export const updateNote = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const note = await Notes.findById(id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    return res.status(200).json({ message: "Note updated successfully", note });
};
