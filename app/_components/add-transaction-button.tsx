"use client";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

import { useState } from "react";
import UpserTransactionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIsOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button className="rounded-full font-bold" onClick={handleIsOpenDialog}>
        <ArrowDownUpIcon />
        Adicionar transação
      </Button>
      <UpserTransactionDialog
        setIsOpen={setIsDialogOpen}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
