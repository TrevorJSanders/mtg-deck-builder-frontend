import { MTGcardSchema } from "@/data/schema";
import { getAllCardsMTG } from "@/services/allCardsMTGService";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { columns } from "@/app/MTGcard/columns";
import { DataTableSkeleton } from "./DataTableSkeleton";

export function MTGTable() {
  const { data, error, isLoading } = useQuery<
    { exists: boolean; cards: MTGcardSchema[] },
    Error
  >({
    queryKey: ["bulkLoad"],
    queryFn: getAllCardsMTG,
  });

  if (isLoading) {
    return <DataTableSkeleton columns={columns} data={[]} />;
  }
  if (error) return <div>An error occurred: {error.message}</div>;

  const realData: MTGcardSchema[] = data?.cards ?? [];

  return <DataTable columns={columns} data={realData}></DataTable>;
}
