export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 rounded-lg border border-slate-300 
      focus:outline-none focus:ring-2 focus:ring-primary
      transition resize-none ${className}`}
    />
  );
}
