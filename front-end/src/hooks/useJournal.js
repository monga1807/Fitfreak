import { useEffect, useState } from "react";
import * as journalService from "../services/journalService";

export default function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const res = await journalService.getEntries();
      setEntries(res.data.entries || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const addEntry = async (data) => {
    const res = await journalService.createEntry(data);
    setEntries((prev) => [res.data.entry, ...prev]);
  };

  const editEntry = async (id, data) => {
    const res = await journalService.updateEntry(id, data);
    setEntries((prev) =>
      prev.map((e) => (e._id === id ? res.data.entry : e))
    );
  };

  const removeEntry = async (id) => {
    await journalService.deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e._id !== id));
  };

  return { entries, loading, error, addEntry, editEntry, removeEntry };
}
