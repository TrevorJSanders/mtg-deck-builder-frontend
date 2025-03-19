import { useState } from "react";
import {
  Search,
  Settings,
  X,
  Filter,
  SunMoon,
  Download,
  Upload,
  ChevronRight,
  Menu,
  BarChart3,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define card types
interface Card {
  id: number;
  name: string;
  mana: string;
  type: string;
  rarity: string;
}

interface DeckCard {
  id: number;
  name: string;
  quantity: number;
}

export default function MobileLayout(): JSX.Element {
  // State for deck sidebar and view
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
  const [deckView, setDeckView] = useState<"cards" | "stats">("cards");

  // Sample card data
  const sampleCards: Card[] = [
    {
      id: 1,
      name: "Lightning Bolt",
      mana: "{R}",
      type: "Instant",
      rarity: "Common",
    },
    {
      id: 2,
      name: "Black Lotus",
      mana: "{0}",
      type: "Artifact",
      rarity: "Rare",
    },
    {
      id: 3,
      name: "Counterspell",
      mana: "{U}{U}",
      type: "Instant",
      rarity: "Uncommon",
    },
    {
      id: 4,
      name: "Serra Angel",
      mana: "{3}{W}{W}",
      type: "Creature",
      rarity: "Uncommon",
    },
    {
      id: 5,
      name: "Llanowar Elves",
      mana: "{G}",
      type: "Creature",
      rarity: "Common",
    },
    {
      id: 6,
      name: "Wrath of God",
      mana: "{2}{W}{W}",
      type: "Sorcery",
      rarity: "Rare",
    },
    {
      id: 7,
      name: "Dark Ritual",
      mana: "{B}",
      type: "Instant",
      rarity: "Common",
    },
    {
      id: 8,
      name: "Shivan Dragon",
      mana: "{4}{R}{R}",
      type: "Creature",
      rarity: "Rare",
    },
  ];

  // Sample deck data
  const [deckCards, setDeckCards] = useState<DeckCard[]>([
    { id: 1, name: "Lightning Bolt", quantity: 4 },
    { id: 5, name: "Llanowar Elves", quantity: 2 },
  ]);

  // Function to add card to deck
  const addToDeck = (card: Card): void => {
    const existingCard = deckCards.find((c) => c.id === card.id);
    if (existingCard) {
      setDeckCards(
        deckCards.map((c) =>
          c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setDeckCards([
        ...deckCards,
        { id: card.id, name: card.name, quantity: 1 },
      ]);
    }
  };

  // Function to remove card from deck
  const removeFromDeck = (card: DeckCard): void => {
    const existingCard = deckCards.find((c) => c.id === card.id);
    if (existingCard && existingCard.quantity > 1) {
      setDeckCards(
        deckCards.map((c) =>
          c.id === card.id ? { ...c, quantity: c.quantity - 1 } : c
        )
      );
    } else {
      setDeckCards(deckCards.filter((c) => c.id !== card.id));
    }
  };

  // Calculate total cards in deck
  const totalCards = deckCards.reduce((acc, card) => acc + card.quantity, 0);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">MTG Card Database</h1>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Search & Filter</SheetTitle>
                <SheetDescription>
                  Find and filter cards for your deck
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                {/* Search bar integrated into filter drawer */}
                <div>
                  <Label htmlFor="search">Search Cards</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Card name, text, type..."
                      className="pl-8"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Card Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Creature</Badge>
                    <Badge variant="outline">Instant</Badge>
                    <Badge variant="outline">Sorcery</Badge>
                    <Badge variant="outline">Artifact</Badge>
                    <Badge variant="outline">Enchantment</Badge>
                    <Badge variant="outline">Planeswalker</Badge>
                    <Badge variant="outline">Land</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Rarity</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Common</Badge>
                    <Badge variant="outline">Uncommon</Badge>
                    <Badge variant="outline">Rare</Badge>
                    <Badge variant="outline">Mythic</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Mana Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white text-black border-black">
                      White
                    </Badge>
                    <Badge className="bg-blue-500">Blue</Badge>
                    <Badge className="bg-black">Black</Badge>
                    <Badge className="bg-red-500">Red</Badge>
                    <Badge className="bg-green-500">Green</Badge>
                    <Badge className="bg-gray-300 text-black border-black">
                      Colorless
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Customize your deckbuilding experience
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme">Dark Mode</Label>
                    <div className="text-xs text-muted-foreground">
                      Toggle between light and dark themes
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SunMoon className="mr-2 h-4 w-4" />
                    <Switch id="theme" />
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between"
                  >
                    <div className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Import Deck</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between"
                  >
                    <div className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Export Deck</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDeckOpen(!isDeckOpen)}
            className="relative"
          >
            <Menu className="h-4 w-4" />
            {totalCards > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0">
                {totalCards}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main card browser */}
        <div
          className={`flex-1 ${
            isDeckOpen ? "hidden md:block md:w-1/3" : "block"
          }`}
        >
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {sampleCards.map((card) => (
                <div
                  key={card.id}
                  className="border rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{card.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {card.type} • {card.rarity}
                    </div>
                    <div className="text-xs">{card.mana}</div>
                  </div>
                  <Button size="sm" onClick={() => addToDeck(card)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Deck sidebar/overlay */}
        {isDeckOpen && (
          <div className="flex-1 border-l">
            <div className="h-full flex flex-col">
              <div className="border-b p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  My Deck ({totalCards} cards)
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={deckView === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDeckView("cards")}
                  >
                    Cards
                  </Button>
                  <Button
                    variant={deckView === "stats" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDeckView("stats")}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Stats
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeckOpen(false)}
                    className="md:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {deckView === "cards" ? (
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-2">
                    {deckCards.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Your deck is empty. Add some cards!
                      </div>
                    ) : (
                      deckCards.map((card) => (
                        <div
                          key={card.id}
                          className="border rounded-lg p-3 flex justify-between items-center"
                        >
                          <div className="font-medium">{card.name}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{card.quantity}x</Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromDeck(card)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              ) : (
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <div className="text-center py-8 space-y-4">
                      <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
                      <div>
                        <h3 className="font-bold text-lg">Deck Statistics</h3>
                        <p className="text-muted-foreground">
                          Your deck statistics and charts will appear here
                        </p>
                      </div>
                      <div className="space-y-2 text-left border rounded-lg p-4">
                        <h4 className="font-medium">Quick Stats</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>Total Cards:</div>
                          <div className="font-medium">{totalCards}</div>
                          <div>Unique Cards:</div>
                          <div className="font-medium">{deckCards.length}</div>
                          <div>Average Quantity:</div>
                          <div className="font-medium">
                            {deckCards.length > 0
                              ? (totalCards / deckCards.length).toFixed(1)
                              : "0"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
