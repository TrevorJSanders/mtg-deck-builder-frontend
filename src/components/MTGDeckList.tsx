import { MTGTypeList } from "./MTGTypeList";
import { useMTGContext } from "@/contexts/contexts";

export function MTGDeckList() {
  const { groupedRows } = useMTGContext();

  return (
    <>
      <MTGTypeList type="Creature" rows={groupedRows.creatures}></MTGTypeList>
      <MTGTypeList type="Land" rows={groupedRows.lands}></MTGTypeList>
      <MTGTypeList type="Commander" rows={groupedRows.commanders}></MTGTypeList>
      <MTGTypeList
        type="Planeswalker"
        rows={groupedRows.planeswalkers}
      ></MTGTypeList>
      <MTGTypeList type="Sorcery" rows={groupedRows.sorceries}></MTGTypeList>
      <MTGTypeList type="Instant" rows={groupedRows.instants}></MTGTypeList>
      <MTGTypeList type="Artifact" rows={groupedRows.artifacts}></MTGTypeList>
      <MTGTypeList
        type="Enchantment"
        rows={groupedRows.enchantments}
      ></MTGTypeList>
      <MTGTypeList type="Other" rows={groupedRows.other}></MTGTypeList>
    </>
  );
}
