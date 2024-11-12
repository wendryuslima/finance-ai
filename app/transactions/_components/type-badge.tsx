import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-primary hover:bg-muted font-bold ">
        <CircleIcon className="fill-primary mr-1" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-[#F6352E] bg-opacity-10 hover:bg-muted text-[#F6352E] font-bold ">
        <CircleIcon className="fill-[#F6352E] mr-1" size={10} />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-muted text-white hover:bg-muted font-bold ">
        <CircleIcon className="fill-white mr-1" size={10} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
