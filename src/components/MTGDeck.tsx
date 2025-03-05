import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { MTGDeckList } from "./MTGDeckList";
import { MTGDeckStats } from "./MTGDeckStats";

export function MTGDeck() {
  return (
    <>
      <Tabs className="me-2" defaultValue="Deck List">
        <TabsList className="grid w-full grid-cols-2 border-2 border-muted/80 rounded-t-lg">
          <TabsTrigger
            className="h-[35px] flex flex-1 items-center justify-center bg-muted/50 hover:cursor-pointer hover:bg-muted"
            value="Deck List"
          >
            Deck List
          </TabsTrigger>
          <TabsTrigger
            className="h-[35px] flex flex-1 border-l-2 border-muted/80 items-center justify-center bg-muted/50 hover:cursor-pointer hover:bg-muted"
            value="Deck Stats"
          >
            Deck Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Deck List">
          <MTGDeckList></MTGDeckList>
        </TabsContent>
        <TabsContent value="Deck Stats">
          <MTGDeckStats></MTGDeckStats>
        </TabsContent>
      </Tabs>
    </>
  );
}
