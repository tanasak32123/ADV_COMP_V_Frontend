import React from "react";
import { TBuyLotterySchema } from "../BuyLotteryForm";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryAmountInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="baitAmount"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <div className="flex items-center mb-3 justify-end">
            <FormLabel className="me-2">จำนวน:</FormLabel>
            <div className="flex">
              <Button
                type="button"
                variant={`ghost`}
                onClick={() =>
                  onChange(value > 1 ? value - 1 : 1)
                }
              >
                <FaMinus />
              </Button>
              <FormControl>
                <Input
                  type="text"
                  value={value}
                  className="w-10 text-center px-0"
                  disabled
                />
              </FormControl>
              <Button
                type="button"
                variant={`ghost`}
                onClick={() => onChange(value + 1)}
              >
                <FaPlus />
              </Button>
            </div>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
