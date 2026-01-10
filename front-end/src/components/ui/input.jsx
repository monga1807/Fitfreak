export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-lg border border-slate-300 
      focus:outline-none focus:ring-2 focus:ring-primary
      transition ${className}`}
    />
  );
}
