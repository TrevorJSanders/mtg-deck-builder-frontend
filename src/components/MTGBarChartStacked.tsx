"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type barChartData = {
  cmc: string;
  artifact?: number;
  creature?: number;
  enchantment?: number;
  instant?: number;
  sorcery?: number;
  planeswalker?: number;
};

type MTGBarChartStackedProps = {
  chartData: barChartData[];
};

const chartConfig = {
  artifact: {
    label: "Artifact",
    color: "hsl(35, 8.26%, 72.75%)",
  },
  creature: {
    label: "Creature",
    color: "hsl(100, 24.84%, 61.41%)",
  },
  enchantment: {
    label: "Enchantment",
    color: "hsl(62, 66.61%, 85.02%)",
  },
  instant: {
    label: "Instant",
    color: "hsl(209, 44.72%, 80.1%)",
  },
  sorcery: {
    label: "Sorcery",
    color: "hsl(17, 62.39%, 62.78%)",
  },
  planeswalker: {
    label: "Planeswalker",
    color: "hsl(27, 8.16%, 60.8%)",
  },
} satisfies ChartConfig;

export function MTGBarChartStacked({ chartData }: MTGBarChartStackedProps) {
  return (
    <Card className="bg-muted/20 rounded-none border-0">
      <CardHeader>
        <CardTitle>Mana Curve Breakdown</CardTitle>
        <CardDescription>Card Type Per CMC</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="cmc"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {chartData.length !== 0 && (
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            )}
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex flex-wrap"
            />
            <Bar dataKey="artifact" stackId="a" fill="hsl(35, 8.26%, 72.75%)" />
            <Bar
              dataKey="creature"
              stackId="a"
              fill="hsl(100, 24.84%, 61.41%)"
            />
            <Bar
              dataKey="enchantment"
              stackId="a"
              fill="hsl(62, 66.61%, 85.02%)"
            />
            <Bar dataKey="instant" stackId="a" fill="hsl(209, 44.72%, 80.1%)" />
            <Bar dataKey="sorcery" stackId="a" fill="hsl(17, 62.39%, 62.78%)" />
            <Bar
              dataKey="planeswalker"
              stackId="a"
              fill="hsl(27, 8.16%, 60.8%)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
