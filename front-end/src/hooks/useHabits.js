// src/hooks/useHabits.js
// import { useEffect, useState, useCallback } from "react";
// import * as habitService from "../services/habitService";

// export default function useHabits() {
//   const [habits, setHabits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await habitService.getHabits();
//       setHabits(res.data.habits || []);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   const addHabit = async (payload) => {
//     try {
//       const res = await habitService.createHabit(payload);
//       // prepend new habit
//       setHabits((s) => [res.data.habit, ...s]);
//       return res.data.habit;
//     } catch (err) {
//       setError(err);
//       throw err;
//     }
//   };

//   const markDone = async (habitId) => {
//     try {
//       await habitService.checkHabitToday(habitId);
//       // update local state: add a marker to habit (we won't fetch checks here)
//       setHabits((prev) =>
//         prev.map((h) => (h._id === habitId ? { ...h, doneToday: true } : h))
//       );
//     } catch (err) {
//       setError(err);
//       throw err;
//     }
//   };

//   return { habits, loading, error, load, addHabit, markDone };
// }

// src/hooks/useHabits.js
import { useEffect, useState, useCallback } from "react";
import * as habitService from "../services/habitService";

export default function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1) load habits
      const res = await habitService.getHabits();
      const loaded = res.data.habits || [];

      // 2) load today's checks in a single call
      const today = new Date().toISOString().slice(0, 10);
      const checksRes = await habitService.getChecks({ from: today, to: today });
      const byHabit = checksRes.data.byHabit || {};

      // 3) map doneToday into habits
      const mapped = loaded.map((h) => {
        const doneDates = byHabit[h._id] || [];
        return { ...h, doneToday: doneDates.includes(today) };
      });

      setHabits(mapped);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addHabit = async (payload) => {
    try {
      const res = await habitService.createHabit(payload);
      // set doneToday false by default
      setHabits((s) => [{ ...res.data.habit, doneToday: false }, ...s]);
      return res.data.habit;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const markDone = async (habitId) => {
    try {
      const res = await habitService.checkHabitToday(habitId);
      // server returns check with date/habitId
      const date = res.data.check?.date || new Date().toISOString().slice(0, 10);
      setHabits((prev) =>
        prev.map((h) => (h._id === habitId ? { ...h, doneToday: true } : h))
      );
      return { habitId, date };
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { habits, loading, error, load, addHabit, markDone };
}
