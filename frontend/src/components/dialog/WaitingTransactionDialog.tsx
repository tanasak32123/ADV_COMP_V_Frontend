import React from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import ReactLoading from "react-loading";

type Props = {
  open: boolean;
};

export default function WaitingTransactionDialog({ open }: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex justify-center items-center py-14">
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-center items-center">
            <ReactLoading type="spin" color="#000000" />
          </div>
          <div className="text-center">Waiting transaction ...</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
