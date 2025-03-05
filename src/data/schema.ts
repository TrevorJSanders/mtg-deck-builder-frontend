export type MTGcardSchema = {
  Id: string;
  Name: string;
  Set: string;
  CMC: number;
  Type: string;
  Color: string[];
  FullArt: boolean;
  ManaCost: string;
  Power: string;
  Toughness: string,
  Image: string;
  CardFaces: [{ManaCost: string, Power:string, Toughness: string, Image: string}]
};
