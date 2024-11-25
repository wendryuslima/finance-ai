import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryDetails from "./summary-details";

interface SummaryCardsProps {
  month?: string;
  balance: number;
  investimentTotals: number;
  depositsTotal: number;
  expensesTotals: number;
}
const SummaryCards = async ({
  balance,
  investimentTotals,
  depositsTotal,
  expensesTotals,
}: SummaryCardsProps) => {
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
