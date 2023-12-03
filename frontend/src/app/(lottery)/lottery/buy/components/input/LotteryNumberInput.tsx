import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control } from "react-hook-form";
import { TBuyLotterySchema, numberOnlyRegex } from "../BuyLotteryForm";
import { DIGIT_TYPE } from "@/interface/Lottery/buy_lottery.interface";

type Props = {
  control: Control<TBuyLotterySchema>;
  digit: DIGIT_TYPE;
};

export default function LotteryNumberInput({ control, digit }: Props) {
  return (
    <FormField
      control={control}
      name="baitNumber"
      render={() => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">หมายเลข:</FormLabel>
            <div className="flex gap-x-4">
              <FormField
                control={control}
                name="baitNumber.0"
                render={({ field: { value, onChange } }) => (
                  <FormControl>
                    <Input
                      maxLength={1}
                      value={value}
                      className="w-10"
                      onKeyDown={(e) =>
                        onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                      }
                      onChange={(e) => e.preventDefault()}
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={control}
                name="baitNumber.1"
                render={({ field: { value, onChange } }) => (
                  <FormControl>
                    <Input
                      value={value}
                      maxLength={1}
                      className="w-10"
                      onKeyDown={(e) =>
                        onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                      }
                      onChange={(e) => e.preventDefault()}
                    />
                  </FormControl>
                )}
              />
              {digit === DIGIT_TYPE.THREE && (
                <FormField
                  control={control}
                  name="baitNumber.2"
                  render={({ field: { value, onChange } }) => (
                    <FormControl>
                      <Input
                        value={value}
                        maxLength={1}
                        className="w-10"
                        onKeyDown={(e) =>
                          onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                        }
                        onChange={(e) => e.preventDefault()}
                      />
                    </FormControl>
                  )}
                />
              )}
            </div>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
