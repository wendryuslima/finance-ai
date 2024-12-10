import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { ReactNode } from "react";

interface SummaryDetailsProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}
const SummaryDetails = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryDetailsProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}  `}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={` ${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 lg:flex lg:flex-row lg:justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryDetails;
