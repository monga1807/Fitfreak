import React, { useState } from "react";
import useJournal from "../hooks/useJournal";
import JournalItem from "../components/journalItem";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textArea";
import Button from "../components/ui/button";

export default function JournalPage() {
  const { entries, loading, addEntry, editEntry, removeEntry } = useJournal();
  const [form, setForm] = useState({ title: "", content: "", mood: "" });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    await addEntry(form);
    setForm({ title: "", content: "", mood: "" });
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Journal</h1>

      {/* New Entry */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow mt-6 space-y-4"
      >
        <Input
          name="title"
          placeholder="Title (optional)"
          value={form.title}
          onChange={onChange}
        />

        <Textarea
          name="content"
          rows={4}
          placeholder="Write your thoughts..."
          value={form.content}
          onChange={onChange}
        />

        <Input
          name="mood"
          placeholder="Mood (optional)"
          value={form.mood}
          onChange={onChange}
        />

        <Button>Add Entry</Button>
      </form>

      {/* Entries */}
      <div className="mt-8 grid gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-slate-500">No journal entries yet.</p>
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
    </div>
  );
}
