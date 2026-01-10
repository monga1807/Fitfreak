export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-primary text-white hover:opacity-90",
    accent: "bg-accent text-white hover:opacity-90",
    dark: "bg-slate-800 text-white hover:opacity-90",
    outline: "border border-slate-300 hover:bg-slate-100"
  };

  return (
    <button
      {...props}
      className={`px-5 py-3 rounded-lg font-semibold transition 
      ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
