import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryDetails from "./summary-details";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month?: string;
}
const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investimentTotals = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotals = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investimentTotals - expensesTotals;
  return (
    <div className="space-y-6">
      <SummaryDetails
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryDetails
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentTotals}
        />

        <SummaryDetails
          icon={<TrendingUpIcon className="text-primary" size={16} />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryDetails
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotals}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
