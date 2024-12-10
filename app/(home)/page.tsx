import { auth, clerkClient } from "@clerk/nextjs/server";

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
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <NavBar />
      <div className="p-10   overflow-hidden flex flex-col space-y-6 lg:overflow-hidden">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-4 lg:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid items-center w-full gap-6 lg:grid-cols-3">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          {/* Right Section with Scroll */}
          <ScrollArea className="h-[500px] mt-4 ">
            <LastTransactions lastTransactions={dashboard.lastTransaction} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Home;
