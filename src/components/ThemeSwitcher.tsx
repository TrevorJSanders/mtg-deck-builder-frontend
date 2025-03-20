// src/components/ColorThemeSelector.tsx
import { Label } from "@/components/ui/label";
import { useTheme } from "../contexts/ThemeProvider";
import { Button } from "./ui/button";

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
          <Button
            key={key}
            onClick={() => changeColorTheme(value)}
            className={`m-0 p-0 hover:bg-mgc-${themeNames[value]} ${
              colorTheme === value
                ? "ring-2 ring-secondary-foreground"
                : "ring-icon"
            } mg mg-${themeNames[value]} mg-cost mg-2x`}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default ColorThemeSelector;
