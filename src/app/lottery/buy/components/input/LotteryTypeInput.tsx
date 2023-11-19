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

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryTypeInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field: { value } }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">ระบุประเภท:</FormLabel>
            <FormControl className="flex">
              <RadioGroup defaultValue={value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="โต๊ด" id="โต๊ด" />
                  <Label htmlFor="โต๊ด">โต๊ด</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="เต๊ง" id="เต๊ง" />
                  <Label htmlFor="เต๊ง">เต๊ง</Label>
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
