// app/notes/NotesClient.tsx
"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Note from "@/components/Note";
import { Id } from "../../../convex/_generated/dataModel";

export default function NotesClient({ userId }: { userId: string }) {
  const createNote = useMutation(api.notes.create);
  const deleteNote = useMutation(api.notes.deleteNote); // 🆕
  const notes = useQuery(api.notes.getAll);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) return;
    await createNote({ title, content, userId });
    setTitle("");
    setContent("");
  };

  const handleDeleteNote = async (id: Id<"notes">) => {
    await deleteNote({ id });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">📝 My Notes</h1>
          <p className="text-gray-500">Capture and manage your thoughts</p>
        </header>

        <div className="bg-white p-6 rounded shadow space-y-4">
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 p-3 rounded h-28 resize-none focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleCreateNote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            ➕ Add Note
          </button>
        </div>

        <section className="space-y-4">
          {!notes && <p className="text-center text-gray-400">Loading notes...</p>}
          {notes?.length === 0 && (
            <p className="text-center text-gray-400">You don't have any notes yet.</p>
          )}
          {notes?.map((note) => (
            <Note
              key={note._id}
              title={note.title}
              content={note.content}
              onDelete={() => handleDeleteNote(note._id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
