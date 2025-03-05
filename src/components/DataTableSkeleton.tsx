"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { useMTGContext } from "@/contexts/contexts";
import { MTGcardSchema } from "@/data/schema";
import { Skeleton } from "./ui/skeleton";

interface DataTableSkeletonProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableSkeleton<TData, TValue>({
  columns,
  data,
}: DataTableSkeletonProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const { selectedRows, setSelectedRows } = useMTGContext();

  React.useEffect(() => {
    const selected = table.getSelectedRowModel().rows as Row<MTGcardSchema>[];
    setSelectedRows(selected);
  }, [rowSelection, selectedRows]);

  return (
    <div className="p-2 flex flex-col h-full">
      <DataTableToolbar table={table} />
      {/* Tabale Start */}
      <div className="my-2 flex-1 overflow-auto rounded-md border scrollbar-thin">
        <Skeleton className="h-8 w-auto"></Skeleton>
        {Array.from({ length: 17 }).map((_, index) => (
          <div key={index} className="mx-2 my-10 flex space-x-6">
            <Skeleton className="h-6 w-3/12"></Skeleton>
            <Skeleton className="h-6 w-1/12"></Skeleton>
            <Skeleton className="h-6 w-2/12"></Skeleton>
            <Skeleton className="h-6 w-3/12"></Skeleton>
            <Skeleton className="h-6 w-2/12"></Skeleton>
            <Skeleton className="h-6 w-1/12"></Skeleton>
          </div>
        ))}
      </div>
      {/* Table End */}
      <div className="mt-auto">
        <DataTablePagination table={table}></DataTablePagination>
      </div>
    </div>
  );
}
