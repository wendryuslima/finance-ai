import { auth } from "@clerk/nextjs/server";
import NavBar from "../_components/nav-bar";
import { redirect } from "next/navigation";

const Subscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <NavBar />
    </>
  );
};

export default Subscription;
