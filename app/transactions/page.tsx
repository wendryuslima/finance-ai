import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_colums";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6">
        <div className="justify-between flex w-full items-center ">
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default Transactions;
