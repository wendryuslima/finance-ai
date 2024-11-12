import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="h-full flex items-center justify-center">
      <UserButton showName></UserButton>
    </div>
  );
};

export default Home;
