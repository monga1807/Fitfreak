export default function FitnessLogItem({ log }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-lg">{log.date}</h4>
        <span className="text-xs px-2 py-1 rounded-full bg-primary text-white">
          Daily Log
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-100 rounded-lg p-3">
          ⚖️ Weight
          <div className="font-semibold">{log.weight ?? "-"} kg</div>
        </div>

        <div className="bg-slate-100 rounded-lg p-3">
          💧 Water
          <div className="font-semibold">{log.water ?? "-"} L</div>
        </div>

        <div className="bg-slate-100 rounded-lg p-3 col-span-2">
          🏋️ Workout
          <div className="font-semibold">
            {log.workout || "Not recorded"}
          </div>
        </div>
      </div>
    </div>
  );
}
