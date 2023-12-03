import React from "react";
import { TBuyLotterySchema } from "../BuyLotteryForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ARRANGE_TYPE } from "@/interface/Lottery/buy_lottery.interface";

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryTypeInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="arrangeType"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">ประเภท:</FormLabel>
            <FormControl className="flex">
              <RadioGroup value={value} onValueChange={value => onChange(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ARRANGE_TYPE.TOD} id={ARRANGE_TYPE.TOD} />
                  <Label htmlFor={ARRANGE_TYPE.TOD}>โต๊ด</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ARRANGE_TYPE.TENG} id={ARRANGE_TYPE.TENG} />
                  <Label htmlFor={ARRANGE_TYPE.TENG}>เต็ง</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
