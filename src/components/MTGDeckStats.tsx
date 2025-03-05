import { MTGcardSchema } from "@/data/schema";
import { MTGBarChartStacked } from "./MTGBarChartStacked";
import { MTGPieChartStacked } from "./MTGPieChartStacked";
import { useMTGContext } from "@/contexts/contexts";
import { Row } from "@tanstack/react-table";

export function MTGDeckStats() {
  const { groupedRows } = useMTGContext();

  const manaCounts = {
    Lands: {
      W: 0 as number,
      U: 0 as number,
      B: 0 as number,
      R: 0 as number,
      G: 0 as number,
      C: 0 as number,
    },
    Spells: {
      W: 0 as number,
      U: 0 as number,
      B: 0 as number,
      R: 0 as number,
      G: 0 as number,
      C: 0 as number,
    },
  };

  const MAXCMC = 9;

  const getCMC = (card: any) => {
    let cmc = card.CMC;
    const cmcValue = parseFloat(cmc);

    if (isNaN(cmcValue)) {
      return -1;
    }

    if (cmcValue > MAXCMC) {
      return MAXCMC + 1;
    }

    return cmcValue;
  };

  const getManaCost = (card: any, index: number) => {
    const cardFaces =
      card.CardFaces && Array.isArray(card.CardFaces)
        ? card.CardFaces
        : [{ ManaCost: card.ManaCost }];
    const face = cardFaces[index] || { ManaCost: "" };
    return face.ManaCost ?? "";
  };

  const countLandProduction = (cards: Row<MTGcardSchema>[]) => {
    cards.forEach((card) => {
      const mana = card.original.Color as string[];
      if (mana?.length === 0) {
        manaCounts.Lands.C++;
      } else {
        for (let char of mana) {
          manaCounts.Lands[char as keyof typeof manaCounts.Lands]++;
        }
      }
    });
  };

  countLandProduction(groupedRows.lands);

  const countSpellCosts = (cards: Row<MTGcardSchema>[]) => {
    cards.forEach((card) => {
      const cardMana = card.original.CardFaces
        ? card.original.CardFaces.map((_, index) =>
            getManaCost(card.original, index).replace(/[\/{]/g, "")
          )
        : [card.original.ManaCost.replace(/[\/{]/g, "")];

      let mana = "";
      cardMana.forEach((m) => {
        mana += m;
      });

      for (let char of mana) {
        if (["W", "U", "B", "R", "G", "C"].includes(char)) {
          manaCounts.Spells[char as keyof typeof manaCounts.Spells]++;
        }
      }
    });
  };

  countSpellCosts(groupedRows.artifacts);
  countSpellCosts(groupedRows.creatures);
  countSpellCosts(groupedRows.enchantments);
  countSpellCosts(groupedRows.instants);
  countSpellCosts(groupedRows.sorceries);
  countSpellCosts(groupedRows.planeswalkers);

  const spellCostData = [
    {
      color: "White",
      spellCost: manaCounts.Spells.W,
      fill: "hsl(62, 66.61%, 85.02%)",
    },
    {
      color: "Blue",
      spellCost: manaCounts.Spells.U,
      fill: "hsl(209, 44.72%, 80.1%)",
    },
    {
      color: "Black",
      spellCost: manaCounts.Spells.B,
      fill: "hsl(27, 8.16%, 60.8%)",
    },
    {
      color: "Red",
      spellCost: manaCounts.Spells.R,
      fill: "hsl(17, 62.39%, 62.78%)",
    },
    {
      color: "Green",
      spellCost: manaCounts.Spells.G,
      fill: "hsl(100, 24.84%, 61.41%)",
    },
    {
      color: "Colorless",
      spellCost: manaCounts.Spells.C,
      fill: "hsl(35, 8.26%, 72.75%)",
    },
  ];

  const landProductionData = [
    {
      color: "White",
      landProduction: manaCounts.Lands.W,
      fill: "hsl(62, 66.61%, 85.02%)",
    },
    {
      color: "Blue",
      landProduction: manaCounts.Lands.U,
      fill: "hsl(209, 44.72%, 80.1%)",
    },
    {
      color: "Black",
      landProduction: manaCounts.Lands.B,
      fill: "hsl(27, 8.16%, 60.8%)",
    },
    {
      color: "Red",
      landProduction: manaCounts.Lands.R,
      fill: "hsl(17, 62.39%, 62.78%)",
    },
    {
      color: "Green",
      landProduction: manaCounts.Lands.G,
      fill: "hsl(100, 24.84%, 61.41%)",
    },
    {
      color: "Colorless",
      landProduction: manaCounts.Lands.C,
      fill: "hsl(35, 8.26%, 72.75%)",
    },
  ];

  const groupByCMC = (arr: any[]) => {
    return arr.reduce((acc, row) => {
      const cmc = getCMC(row.original);
      if (cmc < 0) {
        return acc;
      }
      if (!acc[cmc]) {
        acc[cmc] = [];
      }
      acc[cmc].push(row);
      return acc;
    }, {});
  };

  const groupedArtifactsByCMC = groupByCMC(groupedRows.artifacts);
  const groupedCreaturesByCMC = groupByCMC(groupedRows.creatures);
  const groupedEnchantmentsByCMC = groupByCMC(groupedRows.enchantments);
  const groupedInstantsByCMC = groupByCMC(groupedRows.instants);
  const groupedSorceriesByCMC = groupByCMC(groupedRows.sorceries);
  const groupedPlaneswalkersByCMC = groupByCMC(groupedRows.planeswalkers);

  const createBarChartData = () => {
    const allGrouped = [
      groupedArtifactsByCMC,
      groupedCreaturesByCMC,
      groupedEnchantmentsByCMC,
      groupedInstantsByCMC,
      groupedSorceriesByCMC,
      groupedPlaneswalkersByCMC,
    ];

    const maxCMC = Math.max(
      ...allGrouped.flatMap((group) => Object.keys(group).map(Number))
    );

    const barChartData = [];

    for (let cmc = 0; cmc <= maxCMC; cmc++) {
      let cmcCheck = cmc > MAXCMC ? MAXCMC + 1 + "+" : cmc;
      barChartData.push({
        cmc: cmcCheck.toString(),
        artifact: groupedArtifactsByCMC[cmc]?.length,
        creature: groupedCreaturesByCMC[cmc]?.length,
        enchantment: groupedEnchantmentsByCMC[cmc]?.length,
        instant: groupedInstantsByCMC[cmc]?.length,
        sorcery: groupedSorceriesByCMC[cmc]?.length,
        planeswalker: groupedPlaneswalkersByCMC[cmc]?.length,
      });
    }

    return barChartData;
  };

  const barChartData = createBarChartData();
  return (
    <>
      <MTGPieChartStacked
        landProductionData={landProductionData}
        spellCostData={spellCostData}
      ></MTGPieChartStacked>
      <MTGBarChartStacked chartData={barChartData}></MTGBarChartStacked>
    </>
  );
}
