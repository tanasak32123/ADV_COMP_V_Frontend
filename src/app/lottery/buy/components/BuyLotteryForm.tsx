"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IBuyLottery } from "@/interface/Lottery/buy_lottery.interface";
import LotteryNumberInput from "./input/LotteryNumberInput";
import { LotteryDigit } from "../page";
import LotteryBetInput from "./input/LotteryBetInput";
import LotteryTypeInput from "./input/LotteryTypeInput";
import LotteryFBInput from "./input/LotteryFBInput";
import LotteryAmountInput from "./input/LotteryAmountInput";

const formSchema = z.object({
  number: z.array(z.string()).max(3).min(2),
  bet: z.coerce.number().min(1),
  type: z.string().refine((val) => val === "โต๊ด" || val === "เต๊ง", {
    message: "Invalid type value",
  }),
  amount: z.coerce.number().min(1),
  side: z.string().refine((val) => val === "หน้า" || val === "หลัง", {
    message: "Invalid type value",
  }),
});

type Props = {
  digit: LotteryDigit;
  lotteries: IBuyLottery[];
  addLottery: React.Dispatch<React.SetStateAction<IBuyLottery[]>>;
};

export type TBuyLotterySchema = z.infer<typeof formSchema>;

export const numberOnlyRegex = /^[0-9\b]+$/;

export default function BuyLotteryForm({
  digit,
  lotteries,
  addLottery,
}: Props) {
  const form = useForm<TBuyLotterySchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: ["0", "0", "0"],
      bet: 1,
      type: "โต๊ด",
      amount: 1,
      side: "หน้า",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const maxId = lotteries.reduce((prev, current) => {
      return current.id > prev ? current.id : prev;
    }, 0);
    addLottery((prev) => [
      ...prev,
      {
        id: maxId + 1,
        number: digit === 'digit3' ? values.number.join("") : values.number.slice(0,2).join(""),
        digit,
        bet: values.bet,
        type: values.type,
        amount: values.amount,
        price: values.bet * values.amount,
      },
    ]);
    form.reset();
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

          {digit === "digit3" && (
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
