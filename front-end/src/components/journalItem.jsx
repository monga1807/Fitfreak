import React, { useState } from "react";
import Button from "../components/ui/button";
import Textarea from "../components/ui/textArea";
import Input from "../components/ui/input";

export default function JournalItem({ entry, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(entry.title || "");
  const [content, setContent] = useState(entry.content);
  const [mood, setMood] = useState(entry.mood || "");

  const save = () => {
    onEdit(entry._id, { title, content, mood });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Input
            value={mood}
            placeholder="Mood (optional)"
            onChange={(e) => setMood(e.target.value)}
          />

          <div className="flex gap-3">
            <Button onClick={save}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">
                {entry.title || "Untitled"}
              </h3>
              {entry.mood && (
                <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-accent text-white">
                  {entry.mood}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="dark" onClick={() => onDelete(entry._id)}>
                Delete
              </Button>
            </div>
          </div>

          <p className="mt-4 text-slate-700 whitespace-pre-wrap">
            {entry.content}
          </p>
        </>
      )}
    </div>
  );
}
