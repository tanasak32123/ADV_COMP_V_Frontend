import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";
import { TBuyLotterySchema } from "../BuyLotteryForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Props = {
  control: Control<TBuyLotterySchema>;
};

export default function LotteryFBInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="side"
      render={({ field: { value } }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">ระบุประเภท:</FormLabel>
            <FormControl className="flex">
              <RadioGroup defaultValue={value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="หน้า" id="หน้า" />
                  <Label htmlFor="หน้า">หน้า</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="หลัง" id="หลัง" />
                  <Label htmlFor="หลัง">หลัง</Label>
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
