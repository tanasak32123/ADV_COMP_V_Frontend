"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBuyLottery } from "@/interface/Lottery/buy_lottery.interface";
import { Button } from "@/components/ui/button";

type Props = {
  lotteries: IBuyLottery[];
  deleteLottery: React.Dispatch<React.SetStateAction<IBuyLottery[]>>;
};

export default function LotteryList({ lotteries, deleteLottery }: Props) {
  const onClickDeleteLottery = (id: number) => {
    deleteLottery((prev) => prev.filter((val) => val.id !== id));
  };

  return (
    <>
      <div className="font-bold text-lg">Lottery List</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">หลัก</TableHead>
            <TableHead>เลข</TableHead>
            <TableHead>Bet</TableHead>
            <TableHead className="text-right">ประเภท</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคา</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lotteries.map((lottery, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{lottery.digit}</TableCell>
              <TableCell>{lottery.number}</TableCell>
              <TableCell>{lottery.bet}</TableCell>
              <TableCell>{lottery.type}</TableCell>
              <TableCell>{lottery.amount}</TableCell>
              <TableCell>{lottery.price}</TableCell>
              <TableCell>
                <Button
                  variant={`ghost`}
                  className="text-red-600"
                  onClick={() => onClickDeleteLottery(lottery.id)}
                >
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {lotteries.length === 0 && (
        <div className="h-full flex justify-center items-center">
          <div className="text-xs text-gray-500">ไม่มีสลาก</div>
        </div>
      )}
    </>
  );
}
