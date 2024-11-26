import { TRANSACTION_CATEGORY_LABELS } from "@/app/_components/_constants/transactions";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensePerCategory: TotalExpensePerCategory[];
}
const ExpensesPerCategory = ({
  expensePerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border pb-6 h-full">
      <CardHeader>
        <CardTitle className="font-semibold">Gastos por categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensePerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex justify-between w-full">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>

            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
