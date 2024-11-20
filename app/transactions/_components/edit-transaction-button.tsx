import { Button } from "@/app/_components/ui/button";
import UpserTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogIsOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={handleDialogIsOpen}
      >
        <PencilIcon />
      </Button>
      <UpserTransactionDialog
        setIsOpen={setIsDialogOpen}
        isOpen={isDialogOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
