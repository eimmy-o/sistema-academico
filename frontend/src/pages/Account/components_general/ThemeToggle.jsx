import React from "react";

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return getSystemPrefersDark(); // si no hay guardado, usa el del sistema
  });

  // aplicar al cargar y cuando cambie
  React.useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // (opcional) si cambia el tema del sistema y el usuario no guardó nada
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const saved = localStorage.getItem("theme");
      if (!saved) setIsDark(e.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <button
      className="btn btn--icon"
      type="button"
      aria-pressed={isDark}
      title={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={() => setIsDark(v => !v)}
    >
      {isDark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
