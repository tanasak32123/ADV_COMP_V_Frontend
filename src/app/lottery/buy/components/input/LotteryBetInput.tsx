import React from "react";
import { TBuyLotterySchema } from "../BuyLotteryForm";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryBetInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="bet"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">Bet:</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={value}
                onChange={(e) => {
                  onChange(
                    Number(e.target.value) > 0
                      ? String(Number(e.target.value))
                      : "1"
                  );
                }}
                className=""
                min={1}
              />
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
