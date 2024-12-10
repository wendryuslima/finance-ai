"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { GenerateAiReport } from "../_actions/-generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import MarkDown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  month: string;
  hasPremiumPlan: boolean;
}
const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const AiReport = await GenerateAiReport({ month });
      setReport(AiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>

      {hasPremiumPlan ? (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>

              <DialogDescription>
                Use inteligência artifical para gerar um relatório com insights
                sobre suas finanças
              </DialogDescription>
            </DialogHeader>
            <ScrollArea
              className="prose max-h-[350px]
          text-white prose-h3:text-white prose-h4:text-white  prose-strong:text-white"
            >
              {" "}
              <MarkDown>{report}</MarkDown>
            </ScrollArea>

            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>

              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>

              <DialogDescription>
                Você precisa ter o plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>

              <Button asChild>
                <Link href="/subscription">Atualizar plano</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AiReportButton;
