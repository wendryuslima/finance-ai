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
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

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
    redirect(`?month=${("0" + (new Date().getMonth() + 1)).slice(-2)}`);
  }

  const dashboard = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <NavBar />
      <div className="p-6 flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton month={month} />
            <TimeSelect />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid h-full overflow-hidden grid-cols-[2fr,1fr] gap-6">
          {/* Left Section */}
          <div className="flex flex-col overflow-hidden gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-3 gap-6 mt-4">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          {/* Right Section with Scroll */}
          <ScrollArea className="h-[500px] ">
            <LastTransactions lastTransactions={dashboard.lastTransaction} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Home;
