import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_components/_constants/transactions";
import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";

import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }

    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }

    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "-";
    }
    return "+";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Ultimas transações</CardTitle>
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2  ">
              <div className="p-3 bg-white bg-opacity-[3%] rounded-lg">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  alt="pix"
                  height={20}
                  width={20}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className={`text-sm font-bold ${getAmountColor(transaction)} `}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
