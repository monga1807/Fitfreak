import { useEffect, useState } from "react";
import * as fitnessService from "../services/fitnessService";

export default function useFitness() {
  const [today, setToday] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [todayRes, logsRes] = await Promise.all([
        fitnessService.getToday(),
        fitnessService.getAllLogs()
      ]);

      setToday(todayRes.data.log || null);
      setLogs(logsRes.data.logs || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data) => {
    const res = await fitnessService.saveToday(data);
    setToday(res.data.log);
    // refresh logs list
    const logsRes = await fitnessService.getAllLogs();
    setLogs(logsRes.data.logs || []);
  };

  return { today, logs, loading, save };
}
