"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type PieChartData = {
  color: string;
  landProduction?: number;
  spellCost?: number;
  fill: string;
};

type MTGPieChartStackedProps = {
  landProductionData: PieChartData[];
  spellCostData: PieChartData[];
};

const chartConfig = {
  count: {
    label: "Count",
  },
  landProduction: {
    label: "Land Production",
  },
  spellCost: {
    label: "Spell Cost",
  },
  White: {
    label: "White",
    color: "hsl(62, 66.61%, 85.02%)",
  },
  Blue: {
    label: "Blue",
    color: "hsl(209, 44.72%, 80.1%)",
  },
  Black: {
    label: "Black",
    color: "hsl(27, 8.16%, 60.8%)",
  },
  Red: {
    label: "Red",
    color: "hsl(17, 62.39%, 62.78%)",
  },
  Green: {
    label: "Green",
    color: "hsl(100, 24.84%, 61.41%)",
  },
  Colorless: {
    label: "Colorless",
    color: "hsl(35, 8.26%, 72.75%)",
  },
} satisfies ChartConfig;

export function MTGPieChartStacked({
  landProductionData,
  spellCostData,
}: MTGPieChartStackedProps) {
  return (
    <Card className="flex flex-col bg-muted/20 rounded-none border-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mana Symbol Breakdown</CardTitle>
        <CardDescription>
          Land Production (Outer) / Spell Costs (Inner)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="count"
                  nameKey="color"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label;
                  }}
                />
              }
            />
            <Pie
              data={spellCostData}
              dataKey="spellCost"
              outerRadius={60}
              animationBegin={0}
              animationDuration={500}
            />
            <Pie
              data={landProductionData}
              dataKey="landProduction"
              innerRadius={70}
              outerRadius={100}
              animationBegin={0}
              animationDuration={500}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
