import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_colums";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const Transactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <NavBar />
      <div className="flex flex-col space-y-1 px-6 py-2 lg:overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">Transações</h1>
          <div className="flex space-x-1">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>

        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default Transactions;
