import { auth, clerkClient } from "@clerk/nextjs/server";
import NavBar from "../_components/nav-bar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlan from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

import GetCurrentMonthTransaction from "../_data/get-current-month-transactions";

const Subscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremium = user.publicMetadata.subscriptionPlan == "premium";
  const currentMonthTransactions = await GetCurrentMonthTransaction();
  return (
    <>
      <NavBar />

      <div className=" space-y-6 p-6">
        <h1 className="font-bold text-2xl">Assinatura</h1>

        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              <h2 className="font-semibold text-2xl text-center">
                Plano Básico
              </h2>

              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="text-4xl">0</span>
                <span>mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremium && (
                <Badge className="absolute top-4 bg-primary/10 text-primary  left-4">
                  Ativo
                </Badge>
              )}
              <h2 className="font-semibold text-2xl text-center">
                Plano Premium
              </h2>

              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="text-4xl">13,99</span>
                <span>mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>

              <AcquirePlan />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Subscription;
