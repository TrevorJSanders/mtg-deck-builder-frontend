import { useContext, useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSubContent,
  MenubarSub,
  MenubarSubTrigger,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";
import { MTGcardSchema } from "@/data/schema";
import { Row } from "@tanstack/react-table";
import { useMTGContext } from "@/contexts/contexts";
import {
  DataTableContext,
  //DataTableProvider,
} from "@/contexts/dataTableContext";

const themeClasses = {
  light: "",
  dark: "dark",
  red: "red",
  blue: "blue",
};

export const MTGmenu = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [cardInfoVisableChecked, setCardInfoVisableChecked] = useState(true);
  const [cardInfoFloatingChecked, setCardInfoFloatingChecked] = useState(false);
  const [deckVisableChecked, setDeckVisableChecked] = useState(true);
  const [deckFloatingChecked, setDeckFloatingChecked] = useState(false);
  const [searchVisableChecked, setSearchVisableChecked] = useState(true);
  const [searchFloatingChecked, setSearchFloatingChecked] = useState(false);

  const { selectedRows, deckname, description } = useMTGContext();

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(themeClasses).forEach((key) => {
      root.classList.toggle(key, theme === key);
    });
    localStorage.setItem("theme", theme);
  }, [theme]);

  const loadFile = (id: string) => {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput?.click();
    const context = useContext(DataTableContext);
    const table = context?.table;
    table.setRowSelection({});
  };

  const downloadFile = () => {
    let content = deckname + "\n\n";
    content += description + "\n\n";
    content += cardsToString(selectedRows);
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = deckname + ".txt";
    link.click();
  };

  const cardsToString = (cards: Row<MTGcardSchema>[]) => {
    const sortedCards = cards.slice();

    sortedCards.sort((cardA, cardB) => {
      const nameA = cardA.original.Name.toLowerCase();
      const nameB = cardB.original.Name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    let retString = "";
    sortedCards.forEach((card) => {
      retString += "1 -";
      retString += ' "' + card.original.Name + '"';
      retString += " (" + card.original.Set + ")";
      retString += " [" + card.original.Id + "]\n";
    });
    return retString;
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Deck Editor</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Deck <MenubarShortcut>Ctrl + D</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => loadFile("loadDeckFile")}>
            Load Deck <MenubarShortcut>Ctrl + L</MenubarShortcut>
          </MenubarItem>
          <input
            id="loadDeckFile"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => console.log(e.target.files)}
          />
          <MenubarItem onClick={downloadFile}>
            Save Deck <MenubarShortcut>Ctrl + S</MenubarShortcut>
          </MenubarItem>
          <input
            id="saveDeckFile"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => console.log(e.target.files)}
          />
          <MenubarSeparator />
          <MenubarItem>Copy Deck From Clipboard</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Close</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Card Info</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem
                checked={cardInfoVisableChecked}
                onCheckedChange={setCardInfoVisableChecked}
              >
                <MenubarItem className="py-0">Visable</MenubarItem>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={cardInfoFloatingChecked}
                onCheckedChange={setCardInfoFloatingChecked}
                disabled={!cardInfoVisableChecked}
              >
                <MenubarItem className="py-0">Floating</MenubarItem>
              </MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Deck</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem
                checked={deckVisableChecked}
                onCheckedChange={setDeckVisableChecked}
              >
                <MenubarItem className="py-0">Visable</MenubarItem>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={deckFloatingChecked}
                onCheckedChange={setDeckFloatingChecked}
                disabled={!deckVisableChecked}
              >
                <MenubarItem className="py-0">Floating</MenubarItem>
              </MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Search</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem
                checked={searchVisableChecked}
                onCheckedChange={setSearchVisableChecked}
              >
                <MenubarItem className="py-0">Visable</MenubarItem>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={searchFloatingChecked}
                onCheckedChange={setSearchFloatingChecked}
                disabled={!searchVisableChecked}
              >
                <MenubarItem className="py-0">Floating</MenubarItem>
              </MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              setCardInfoVisableChecked(true);
              setCardInfoFloatingChecked(false);
              setDeckVisableChecked(true);
              setDeckFloatingChecked(false);
              setSearchVisableChecked(true);
              setSearchFloatingChecked(false);
            }}
          >
            Default Settings
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="red">Red</MenubarRadioItem>
            <MenubarRadioItem value="blue">Blue</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>No one can help you... :)</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
