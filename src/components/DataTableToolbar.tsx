"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

import { attributes, colors, types } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSorted = table.getState().sorting.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter cards..."
          value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Type") && (
          <DataTableFacetedFilter
            column={table.getColumn("Type")}
            title="Type"
            options={types}
          />
        )}
        {table.getColumn("Color") && (
          <DataTableFacetedFilter
            column={table.getColumn("Color")}
            title="Color"
            maxDisplay={6}
            options={colors}
          />
        )}
        <DataTableFacetedFilter
          column={table.getColumn("Attribute")}
          title="Attribute"
          maxDisplay={2}
          options={attributes}
        />
        {(isFiltered || isSorted) && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.resetSorting();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Clear
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
