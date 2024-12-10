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
  userCanAddTransaction?: boolean;
}
const SummaryCards = async ({
  balance,
  investimentTotals,
  depositsTotal,
  expensesTotals,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryDetails
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid gap-6 lg:grid-cols-3">
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
