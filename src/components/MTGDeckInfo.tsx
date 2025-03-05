import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useMTGContext } from "@/contexts/contexts";

export function MTGDeckInfo() {
  const { deckname, setDeckname, description, setDescription } =
    useMTGContext();

  return (
    <div className="p-0 w-full h-full flex flex-col space-y-4">
      <div className="flex flex-col gap-1.5">
        <Label>Deck Name</Label>
        <Input
          className="resize-none flex-1"
          id="deckname"
          placeholder="My big dumb deck..."
          value={deckname}
          onChange={(e) => setDeckname(e.target.value)}
        />
      </div>

      <div className="flex flex-col h-full gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className="scrollbar-thin resize-none flex-1"
          placeholder="Blue is a crutch and I'm a limp little baby..."
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
