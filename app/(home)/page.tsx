import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import NavBar from "../_components/nav-bar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

import { getDashboard } from "../_data/get-dashboard";
import TransactionPieChart from "./_components/transaction-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transaction";

interface HomeProps {
  searchParams: {
    month?: string;
  };
}
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("?month=01");
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6 ">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} />

            <div className="grid  grid-cols-3 gap-6 mt-4">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboard.lastTransaction} />
        </div>
      </div>
    </>
  );
};

export default Home;
