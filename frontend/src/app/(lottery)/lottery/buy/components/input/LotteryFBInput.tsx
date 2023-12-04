import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";
import { TBuyLotterySchema } from "../BuyLotteryForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PLAY_TYPE } from "@/interface/lottery/buy_lottery.interface";

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryFBInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="playType"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">รูปแบบ:</FormLabel>
            <FormControl className="flex">
              <RadioGroup value={value} onValueChange={value => onChange(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={PLAY_TYPE.FRONT} id={PLAY_TYPE.FRONT} />
                  <Label htmlFor={PLAY_TYPE.FRONT}>หน้า</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={PLAY_TYPE.BACK} id={PLAY_TYPE.BACK} />
                  <Label htmlFor={PLAY_TYPE.BACK}>หลัง</Label>
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
