// src/components/ColorThemeSelector.tsx
import { Label } from "@/components/ui/label";
import { useTheme } from "../contexts/ThemeProvider";

const ColorThemeSelector = () => {
  const { colorTheme, changeColorTheme, COLOR_THEMES } = useTheme();

  // Map of theme keys to display names
  const themeNames = {
    [COLOR_THEMES.WHITE]: "w",
    [COLOR_THEMES.BLUE]: "u",
    [COLOR_THEMES.BLACK]: "b",
    [COLOR_THEMES.RED]: "r",
    [COLOR_THEMES.GREEN]: "g",
    [COLOR_THEMES.COLORLESS]: "c",
  };

  return (
    <div className="theme-selector">
      <Label htmlFor="theme">Primary Color</Label>
      <div className="my-2 flex flex-wrap gap-2">
        {Object.entries(COLOR_THEMES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => changeColorTheme(value)}
            className={`rounded ${
              colorTheme === value ? "ring-2 ring-foreground" : "bg-secondary"
            } mg mg-${themeNames[value]} mg-cost mg-2x`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorThemeSelector;
