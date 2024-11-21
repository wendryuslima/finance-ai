import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col h-full justify-center p-8 max-w-[550px] mx-auto">
        <Image
          src="/logo-finance-ai.svg"
          alt="logo"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AIé uma plataforma de gestão financeira que utiliza I para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative w-full h-full">
        <Image
          src="/login-background.png"
          alt="login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
