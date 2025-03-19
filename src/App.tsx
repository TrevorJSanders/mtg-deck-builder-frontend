//frontend in Vercel
//https://render.com/

//backend in Render
//https://render.com

//DB in Atlas
//https://www.mongodb.com/cloud

import "./App.css";
import "../local_modules/mana-font/css/mana.min.css";
import { MTGmenu } from "./components/MTGmenu";
import { queryClient } from "./services/apiClient";
import { MTGTable } from "./components/MTGTable";
import { QueryClientProvider } from "@tanstack/react-query";
import { MTGCardImage } from "./components/MTGCardImage";
import { MTGContextProvider } from "./contexts/contexts";
import { MTGDeckInfo } from "./components/MTGDeckInfo";
import { MTGDeck } from "./components/MTGDeck";
import { useDeviceDetection } from "./hooks/useDeviceDetection";
//import { DataTableProvider } from "./contexts/dataTableContext";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const { isMobile } = useDeviceDetection();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MTGContextProvider>
          <div className="flex flex-col h-screen scrollbar-track-background scrollbar-thumb-secondary">
            <MTGmenu />
            <div className="flex flex-1 flex-row overflow-hidden">
              <div className="flex flex-col w-2/3">
                {!isMobile && <MTGTable />}
                {isMobile && "Mobile not working yet... I'm on it :)"}
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
