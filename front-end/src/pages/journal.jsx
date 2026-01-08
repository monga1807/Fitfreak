import React, { useState } from "react";
import useJournal from "../hooks/useJournal";
import JournalItem from "../components/journalItem";

export default function JournalPage() {
  const { entries, loading, addEntry, editEntry, removeEntry } = useJournal();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await addEntry({ title, content, mood });
    setTitle("");
    setContent("");
    setMood("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 20 }}>
      <h2>Journal</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="Mood (optional)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <button type="submit">Save Entry</button>
      </form>

      <hr />

      {loading ? (
        <p>Loading...</p>
      ) : (
        entries.map((entry) => (
          <JournalItem
            key={entry._id}
            entry={entry}
            onEdit={editEntry}
            onDelete={removeEntry}
          />
        ))
      )}
    </div>
  );
}
