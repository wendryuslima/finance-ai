import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const GetCurrentMonthTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorizes");
  }
  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};

export default GetCurrentMonthTransaction;