//frontend in Vercel
//https://render.com/

//backend in Render
//https://render.com

//DB in Atlas
//https://www.mongodb.com/cloud

import "./App.css";
import "../local_modules/mana-font/css/mana.min.css";
import { queryClient } from "./services/apiClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MTGContextProvider } from "./contexts/contexts";
import { LayoutAdapter } from "./Layouts/index";
import { ThemeProvider } from "./contexts/ThemeProvider";
//import { DataTableProvider } from "./contexts/dataTableContext";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <MTGContextProvider>
            <LayoutAdapter />
          </MTGContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
