import "./App.css";
import "../node_modules/mana-font/css/mana.min.css";
import { MTGmenu } from "./components/MTGmenu";
import { queryClient } from "./services/apiClient";
import { MTGTable } from "./components/MTGTable";
import { QueryClientProvider } from "@tanstack/react-query";
import { MTGCardImage } from "./components/MTGCardImage";
import { MTGContextProvider } from "./contexts/contexts";
import { MTGDeckInfo } from "./components/MTGDeckInfo";
import { MTGDeck } from "./components/MTGDeck";
//import { DataTableProvider } from "./contexts/dataTableContext";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MTGContextProvider>
          <div className="flex flex-col h-screen scrollbar-track-background scrollbar-thumb-secondary">
            <MTGmenu />
            <div className="flex flex-1 flex-row overflow-hidden">
              <div className="flex flex-col w-2/3">
                <MTGTable />
              </div>
              <div className="flex flex-1 flex-col w-1/3 ">
                <div className="flex flex-row">
                  <div className="w-1/2 m-2 aspect-[488/680]">
                    <MTGCardImage></MTGCardImage>
                  </div>
                  <div className="w-1/2 m-2">
                    <MTGDeckInfo></MTGDeckInfo>
                  </div>
                </div>
                <div className="flex-grow text-center h-full overflow-y-auto scrollbar-thin">
                  <MTGDeck></MTGDeck>
                </div>
              </div>
            </div>
          </div>
        </MTGContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
