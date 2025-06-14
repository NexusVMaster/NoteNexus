// components/Note.tsx
import { MouseEvent } from "react";

interface NoteProps {
  title: string;
  content: string;
  onDelete: () => void;
}

export default function Note({ title, content, onDelete }: NoteProps) {
  return (
    <div className="bg-white shadow rounded p-5 hover:shadow-md transition relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Delete note"
      >
        🗑
      </button>
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
