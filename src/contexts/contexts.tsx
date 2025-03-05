import { MTGcardSchema } from "@/data/schema";
import { Row } from "@tanstack/react-table";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GroupedRows {
  creatures: Row<MTGcardSchema>[];
  commanders: Row<MTGcardSchema>[];
  lands: Row<MTGcardSchema>[];
  planeswalkers: Row<MTGcardSchema>[];
  sorceries: Row<MTGcardSchema>[];
  instants: Row<MTGcardSchema>[];
  artifacts: Row<MTGcardSchema>[];
  enchantments: Row<MTGcardSchema>[];
  other: Row<MTGcardSchema>[];
}

const MTGContext = createContext({
  selectedRows: [] as Row<MTGcardSchema>[],
  setSelectedRows: (_rows: Row<MTGcardSchema>[]) => {},
  lastClickedId: "" as string,
  setLastClickedId: (_cardId: string) => {},
  groupedRows: {} as GroupedRows,
  setGroupedRows: (_rows: GroupedRows) => {},
  deckname: "",
  setDeckname: (_name: string) => {},
  description: "",
  setDescription: (_desc: string) => {},
});

export const MTGContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRows, setSelectedRows] = useState<Row<MTGcardSchema>[]>([]);
  const [lastClickedId, setLastClickedId] = useState<string>("");
  const [groupedRows, setGroupedRows] = useState<GroupedRows>({
    creatures: [],
    commanders: [],
    lands: [],
    planeswalkers: [],
    sorceries: [],
    instants: [],
    artifacts: [],
    enchantments: [],
    other: [],
  });

  const [deckname, setDeckname] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const newGroupedRows: GroupedRows = {
      creatures: [] as Row<MTGcardSchema>[],
      commanders: [] as Row<MTGcardSchema>[],
      lands: [] as Row<MTGcardSchema>[],
      planeswalkers: [] as Row<MTGcardSchema>[],
      sorceries: [] as Row<MTGcardSchema>[],
      instants: [] as Row<MTGcardSchema>[],
      artifacts: [] as Row<MTGcardSchema>[],
      enchantments: [] as Row<MTGcardSchema>[],
      other: [] as Row<MTGcardSchema>[],
    };

    selectedRows.forEach((row) => {
      const type = row.original?.Type || "";

      if (type.includes("Creature")) {
        newGroupedRows.creatures.push(row);
      } else if (type.includes("Commander")) {
        newGroupedRows.commanders.push(row);
      } else if (type.includes("Land")) {
        newGroupedRows.lands.push(row);
      } else if (type.includes("Planeswalker")) {
        newGroupedRows.planeswalkers.push(row);
      } else if (type.includes("Sorcery")) {
        newGroupedRows.sorceries.push(row);
      } else if (type.includes("Instant")) {
        newGroupedRows.instants.push(row);
      } else if (type.includes("Artifact")) {
        newGroupedRows.artifacts.push(row);
      } else if (type.includes("Enchantment")) {
        newGroupedRows.enchantments.push(row);
      } else {
        newGroupedRows.other.push(row);
      }
    });

    Object.keys(newGroupedRows).forEach((key) => {
      const typedKey = key as keyof GroupedRows;
      newGroupedRows[typedKey] = newGroupedRows[typedKey].sort((a, b) => {
        return a.original.Name.localeCompare(b.original.Name);
      });
    });

    setGroupedRows(newGroupedRows);
  }, [selectedRows]);

  return (
    <MTGContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        lastClickedId,
        setLastClickedId,
        groupedRows,
        setGroupedRows,
        deckname,
        setDeckname,
        description,
        setDescription,
      }}
    >
      {children}
    </MTGContext.Provider>
  );
};

export const useMTGContext = () => useContext(MTGContext);
