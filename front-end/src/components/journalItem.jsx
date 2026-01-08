import React, { useState } from "react";

export default function JournalItem({ entry, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(entry.content);
  const [title, setTitle] = useState(entry.title || "");
  const [mood, setMood] = useState(entry.mood || "");

  const saveEdit = () => {
    onEdit(entry._id, { title, content, mood });
    setIsEditing(false);
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12
    }}>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Mood (optional)"
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{entry.title || "Untitled"}</h4>
          <p>{entry.content}</p>
          {entry.mood && <small>Mood: {entry.mood}</small>}
          <div style={{ marginTop: 8 }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(entry._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
