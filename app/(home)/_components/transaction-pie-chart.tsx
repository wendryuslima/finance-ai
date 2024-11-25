"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageType from "./percentage-item";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Depósito",
    color: "#55BO2E",
  },

  [TransactionType.EXPENSE]: {
    label: "Depósito",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransasactionPieChartProps {
  typePercentage: TransactionPercentagePerType;
  investimentTotals: number;
  depositsTotal: number;
  expensesTotals: number;
}

const TrnasactionPieChart = ({
  investimentTotals,
  depositsTotal,
  expensesTotals,
  typePercentage,
}: TransasactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investimentTotals,
      fill: "#E93030",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotals,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageType
            title="Receita"
            value={typePercentage[TransactionType.DEPOSIT]}
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />

          <PercentageType
            title="Investido"
            value={typePercentage[TransactionType.INVESTMENT]}
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
          />

          <PercentageType
            title="Despesas"
            value={typePercentage[TransactionType.DEPOSIT]}
            icon={<PiggyBankIcon size={16} className="text-white" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrnasactionPieChart;
