// src/components/ModeToggle.tsx
import { useTheme } from "../contexts/ThemeProvider";

const ModeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-full bg-primary text-primary-foreground"
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    >
      {mode === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
};

export default ModeToggle;
