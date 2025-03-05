import { createContext, useState } from "react";

interface DataTableContextProps {
  table: any;
  setTable: (table: any) => void;
}

const DataTableContext = createContext<DataTableContextProps | null>(null);

const DataTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [table, setTable] = useState<any>({});
  // You can add more state and functions here as needed

  return (
    <DataTableContext.Provider value={{ table, setTable }}>
      {children}
    </DataTableContext.Provider>
  );
};

export { DataTableProvider, DataTableContext };
