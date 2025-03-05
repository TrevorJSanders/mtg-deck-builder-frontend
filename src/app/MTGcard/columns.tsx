"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { MTGcardSchema } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";

export const columns: ColumnDef<MTGcardSchema>[] = [
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("Name")}
        </span>
      );
    },
  },
  {
    accessorKey: "Set",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Set" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("Set")}
        </span>
      );
    },
  },
  {
    accessorKey: "ManaCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mana Cost" />
    ),
    enableSorting: true,
    enableHiding: true,

    sortingFn: (rowA, rowB, columnId) => {
      //IDK Man...
      if (columnId) {
      }
      const getManaCost = (card: any, index: number) => {
        const cardFaces =
          card.CardFaces && Array.isArray(card.CardFaces)
            ? card.CardFaces
            : [{ ManaCost: card.ManaCost }];
        const face = cardFaces[index] || { ManaCost: "" };
        return face.ManaCost ?? "";
      };

      const getCMC = (card: any) => {
        let cmc = card.CMC;
        const cmcValue = parseFloat(cmc);
        if (isNaN(cmcValue)) {
          return 1000;
        }
        return cmcValue;
      };

      const CMCComparison = getCMC(rowA.original) - getCMC(rowB.original);
      if (CMCComparison !== 0) return CMCComparison;

      const manaCostA1 = getManaCost(rowA.original, 0);
      const manaCostB1 = getManaCost(rowB.original, 0);

      const manaCostComparisonA = manaCostA1.localeCompare(manaCostB1);
      if (manaCostComparisonA !== 0) return manaCostComparisonA;

      const manaCostA2 = getManaCost(rowA.original, 1);
      const manaCostB2 = getManaCost(rowB.original, 1);

      return manaCostA2.localeCompare(manaCostB2);
    },
    cell: ({ row }) => {
      const getManaCost = (card: any, index: number) => {
        const cardFaces =
          card.CardFaces && Array.isArray(card.CardFaces)
            ? card.CardFaces
            : [{ ManaCost: card.ManaCost }];
        const face = cardFaces[index] || { ManaCost: "" };
        return face.ManaCost ?? "";
      };

      const rowValue = row.original.CardFaces
        ? row.original.CardFaces.map((_, index) =>
            getManaCost(row.original, index).replace(/[\/{]/g, "")
          )
        : [row.original.ManaCost.replace(/[\/{]/g, "")];

      return (
        <span className="font-small">
          {rowValue.map((manaCost, index) => (
            <span key={index}>
              {index > 0 && manaCost && (
                <span className="font-thin"> {" // "} </span>
              )}
              {manaCost
                .split("}")
                .filter(Boolean)
                .map((str: string, i: number) => (
                  <span
                    key={`${index},${i}`}
                    className={`inline-block mg mg-${str.toLowerCase()} mg-cost`}
                  />
                ))}
            </span>
          ))}
        </span>
      );
    },
  },
  {
    accessorKey: "Power/Toughness",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Power/Toughness" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const powerFlag = ":";
      const toughnessFlag = ";";
      //const newFaceTag = " // ";

      let rowValue: { Power: string; Toughness: string }[] = (row.original
        .CardFaces && Array.isArray(row.original.CardFaces)
        ? row.original.CardFaces
        : [
            {
              Power: row.original.Power,
              Toughness: row.original.Toughness,
            },
          ]) ?? [{ Power: "", Toughness: "" }];

      rowValue.forEach((value) => {
        value.Power = (value.Power ?? "").replace(/\*/g, "x");
        value.Toughness = (value.Toughness ?? "").replace(/\*/g, "x");
      });

      const renderCharacter = (char: string, key: string) => {
        const validChars = "0123456789x";
        if (validChars.includes(char)) {
          return <i key={key} className={`m-0 p-0 w-2 mg mg-${char}`}></i>;
        } else if (char === ":") {
          return <i key={key} className="mx-1 p-0 mg mg-power mg-fw"></i>;
        } else if (char === ";") {
          return <i key={key} className="mx-1 p-0 mg mg-toughness mg-fw"></i>;
        } else {
          return (
            <i
              key={key}
              className="m-0 ps-1 text-xl font-semibold align-middle text-center"
            >
              {char}
            </i>
          );
        }
      };
      return (
        <>
          {rowValue.map((arr, index) => (
            <i key={"ARRAY:" + index}>
              {index > 0 && arr.Power.length > 0 && (
                <i key={index} className="font-thin">
                  {" // "}
                </i>
              )}
              {arr.Power.length > 0 &&
                (arr.Power + powerFlag)
                  .split("")
                  .filter(Boolean)
                  .map((str, i) =>
                    renderCharacter(str, index + ":" + i + "-Power")
                  )}
              {arr.Toughness.length > 0 &&
                (arr.Toughness + toughnessFlag)
                  .split("")
                  .filter(Boolean)
                  .map((str, i) =>
                    renderCharacter(str, index + ":" + i + "-Toughness")
                  )}
            </i>
          ))}
        </>
      );
    },

    sortingFn: (rowA, rowB, columnId) => {
      //IDK Man...
      if (columnId) {
      }
      const getPowerAndToughness = (card: any, index: number) => {
        const cardFaces =
          card.CardFaces && Array.isArray(card.CardFaces)
            ? card.CardFaces
            : [{ Power: card.Power, Toughness: card.Toughness }];
        const face = cardFaces[index] || { Power: "", Toughness: "" };
        return { Power: face.Power ?? "", Toughness: face.Toughness ?? "" };
      };

      const padString = (str: string, len: number) => str.padStart(len, "@");
      const { Power: powerA1, Toughness: toughnessA1 } = getPowerAndToughness(
        rowA.original,
        0
      );
      const { Power: powerB1, Toughness: toughnessB1 } = getPowerAndToughness(
        rowB.original,
        0
      );
      const { Power: powerA2, Toughness: toughnessA2 } = getPowerAndToughness(
        rowA.original,
        1
      );
      const { Power: powerB2, Toughness: toughnessB2 } = getPowerAndToughness(
        rowB.original,
        1
      );

      const powerComparisonA = padString(powerA1, 3).localeCompare(
        padString(powerB1, 3)
      );
      if (powerComparisonA !== 0) return powerComparisonA;

      const toughnessComparisonA = padString(toughnessA1, 3).localeCompare(
        padString(toughnessB1, 3)
      );
      if (toughnessComparisonA !== 0) return toughnessComparisonA;

      const powerComparisonB = padString(powerA2, 3).localeCompare(
        padString(powerB2, 3)
      );
      if (powerComparisonB !== 0) return powerComparisonB;

      return padString(toughnessA2, 3).localeCompare(padString(toughnessB2, 3));
    },
  },
  {
    accessorKey: "Type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "arrIncludesAll",
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("Type")}
        </span>
      );
    },
  },
  {
    accessorKey: "Color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (
      row: Row<MTGcardSchema>,
      columnID: string,
      filterValue: string[]
    ) => {
      //IDK Man...
      if (columnID) {
      }
      let rowValue = (row.getValue("Color") as string[]) || ["C"];
      rowValue = rowValue?.length ? rowValue : ["C"];
      let filterSet = new Set(filterValue?.length ? filterValue : [""]);

      if (filterSet.has("X")) {
        filterSet.delete("X");
        return (
          rowValue.every((color) => filterSet.has(color)) &&
          filterSet.size === rowValue.length
        );
      } else {
        filterSet.add("C");
        return rowValue.every((color) => filterSet.has(color));
      }
    },
    cell: ({ row }) => {
      let rowValue = row.getValue("Color") as string[];
      rowValue = rowValue?.length ? rowValue : ["C"];
      return (
        <span className="flex space-mx-1 max-w-[500px] truncate font-medium">
          {rowValue.map((char, index) => (
            <i key={index} className={"mg mg-" + char.toLowerCase()}></i>
          ))}
        </span>
      );
    },
  },
  {
    accessorKey: "Attribute",
    enableSorting: true,
    enableHiding: false,
    filterFn: (
      row: Row<MTGcardSchema>,
      columnID: string,
      filterValue: string[]
    ) => {
      //IDK Man...
      if (columnID) {
      }
      const rowValue = row.original.FullArt;
      let ret = true;
      let filterSet = new Set(filterValue?.length ? filterValue : [""]);
      if (filterSet.has("A")) {
        ret = rowValue;
      }
      if (filterSet.has("B")) {
        ret = ret ? (row.original.CardFaces ? true : false) : false;
      }
      return ret;
    },
  },
];
