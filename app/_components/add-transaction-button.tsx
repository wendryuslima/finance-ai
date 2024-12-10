"use client";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

import { useState } from "react";
import UpserTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}
const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIsOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={handleIsOpenDialog}
              disabled={!userCanAddTransaction}
            >
              <ArrowDownUpIcon />
              Adicionar transação
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações! Atualize seu plano para ter transações ilimitadas"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpserTransactionDialog
        setIsOpen={setIsDialogOpen}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
