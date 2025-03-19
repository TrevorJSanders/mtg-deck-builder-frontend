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
import { useDeviceDetection } from "./hooks/useDeviceDetection";
import { DesktopLayout } from "./Layouts/DesktopLayout";
import MobileLayout from "./Layouts/MobileLayout";
//import { DataTableProvider } from "./contexts/dataTableContext";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const { isMobile } = useDeviceDetection();
  //const isMobile = true;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MTGContextProvider>
          {!isMobile && DesktopLayout()}
          {isMobile && MobileLayout()}
        </MTGContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
