import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const GetCurrentMonthTransaction = async () => {
  const { userId } = await auth();

  console.log("userId:", userId); // Verifique no log se está correto

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const transactionCount = await db.transaction.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth(new Date()),
          lt: endOfMonth(new Date()),
        },
      },
    });
    console.log("transactionCount:", transactionCount); // Veja quantas transações foram encontradas
    return transactionCount;
  } catch (error) {
    console.error("Erro ao contar transações:", error);
    throw error; // Propague o erro para facilitar a análise
  }
};

export default GetCurrentMonthTransaction;
