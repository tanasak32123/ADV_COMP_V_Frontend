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
import { DIGIT_TYPE } from "@/interface/Lottery/buy_lottery.interface";
import { Button } from "@/components/ui/button";
import { TLottery } from "../page";

type Props = {
  lotteries: TLottery[];
  deleteLottery: React.Dispatch<React.SetStateAction<TLottery[]>>;
};

export default function LotteryList({ lotteries, deleteLottery }: Props) {
  const onClickDeleteLottery = (id: number) => {
    deleteLottery((prev) => prev.filter((val) => val.id !== id));
  };

  return (
    <>
      <div className="font-bold text-lg">Lottery List</div>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">หลัก</TableHead>
            <TableHead className="text-center">เลข</TableHead>
            <TableHead className="text-center">Bet</TableHead>
            <TableHead className="text-center">ประเภท</TableHead>
            <TableHead className="text-center whitespace-nowrap">รูปแบบ</TableHead>
            <TableHead className="text-center">จำนวน</TableHead>
            <TableHead className="text-center">ราคา</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lotteries.map((lottery, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{lottery.digitType === DIGIT_TYPE.TWO ? '2 หลัก' : '3 หลัก'}</TableCell>
              <TableCell>{lottery.baitNumber}</TableCell>
              <TableCell>{lottery.baitValue}</TableCell>
              <TableCell>{lottery.arrangeType === 'Tod' ? 'โต๊ด' : 'เต็ง'}</TableCell>
              <TableCell>{lottery.digitType === DIGIT_TYPE.TWO ? '-' : lottery.playType === 'Front' ? 'หน้า' : 'หลัง'}</TableCell>
              <TableCell>{lottery.baitAmount}</TableCell>
              <TableCell>{lottery.baitValue * lottery.baitAmount}</TableCell>
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
        <div className="h-[300px] flex justify-center items-center">
          <div className="text-xs text-gray-500">ไม่มีสลาก</div>
        </div>
      )}
    </>
  );
}
