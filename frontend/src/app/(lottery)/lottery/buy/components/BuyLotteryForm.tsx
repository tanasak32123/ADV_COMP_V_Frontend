"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ARRANGE_TYPE, DIGIT_TYPE, IBuyLottery, PLAY_TYPE } from "@/interface/lottery/buy_lottery.interface";
import LotteryNumberInput from "./input/LotteryNumberInput";
import LotteryBetInput from "./input/LotteryBetInput";
import LotteryTypeInput from "./input/LotteryTypeInput";
import LotteryFBInput from "./input/LotteryFBInput";
import LotteryAmountInput from "./input/LotteryAmountInput";
import { TLottery } from "../page";

const formSchema = z.object({
  baitNumber: z.array(z.string()).max(3).min(2),
  baitValue: z.coerce.number().min(1),
  arrangeType: z.nativeEnum(ARRANGE_TYPE),
  amount: z.coerce.number().min(1),
  playType: z.nativeEnum(PLAY_TYPE),
});

type Props = {
  digit: DIGIT_TYPE;
  lotteries: TLottery[];
  addLottery: React.Dispatch<React.SetStateAction<TLottery[]>>;
};

export type TBuyLotterySchema = z.infer<typeof formSchema>;

export const numberOnlyRegex = /^[0-9\b]+$/;

const defaultValues = {
  baitNumber: ["0", "0", "0"],
  baitValue: 1,
  arrangeType: ARRANGE_TYPE.TOD,
  amount: 1,
  playType: PLAY_TYPE.FRONT,
}

export default function BuyLotteryForm({
  digit,
  lotteries,
  addLottery,
}: Props) {
  const form = useForm<TBuyLotterySchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const maxId = lotteries.reduce((prev, current) => {
      return current.id > prev ? current.id : prev;
    }, 0);
    addLottery((prev) => [
      ...prev,
      {
        id: maxId + 1,
        baitNumber: digit === DIGIT_TYPE.THREE ? values.baitNumber.join("") : values.baitNumber.slice(0,2).join(""),
        digitType: digit,
        baitValue: values.baitValue,
        playType: values.playType,
        amount: values.amount,
        arrangeType: values.arrangeType,
      },
    ]);
    form.reset(defaultValues);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        <div className="col-span-5 xl:col-span-3 flex flex-col gap-y-5">
          <LotteryNumberInput control={form.control} digit={digit}  />

          <LotteryBetInput control={form.control} />

          <LotteryTypeInput control={form.control} />

          {digit === DIGIT_TYPE.THREE && (
            <LotteryFBInput control={form.control} />
          )}
        </div>
        <div className="col-span-5 xl:col-span-2 grid content-between">
          <LotteryAmountInput control={form.control} />
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#7AA7EE] hover:bg-[#6b9be8] text-white font-bold rounded-[40px] w-[100px]"
            >
              เพิ่ม
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
