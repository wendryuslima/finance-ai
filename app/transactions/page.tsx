import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_colums";

const Transactions = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="p-6 space-y-6">
      <div className="justify-between flex w-full items-center ">
        <h1 className="font-bold text-2xl">Transações</h1>
        <Button className="rounded-full font-bold">
          <ArrowDownUpIcon />
          Adicionar transação
        </Button>
      </div>

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default Transactions;
