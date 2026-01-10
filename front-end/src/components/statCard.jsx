import React from "react";

export default function StatCard({ title, value, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition cursor-pointer"
    >
      <div className="text-sm font-semibold text-slate-500">
        {title}
      </div>

      <div className="mt-2 text-3xl font-extrabold text-slate-900">
        {value}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs font-medium text-slate-400">
          {subtitle}
        </div>
      )}
    </div>
  );
}
