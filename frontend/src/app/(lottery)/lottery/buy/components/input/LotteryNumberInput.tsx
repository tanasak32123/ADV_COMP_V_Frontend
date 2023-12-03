import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control } from "react-hook-form";
import { TBuyLotterySchema, numberOnlyRegex } from "../BuyLotteryForm";
import { LotteryDigit } from "../../page";

type Props = {
  control: Control<TBuyLotterySchema>;
  digit: LotteryDigit
};

export default function LotteryNumberInput({ control, digit }: Props) {
  return (
    <FormField
      control={control}
      name="number"
      render={() => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="me-2">หมายเลข:</FormLabel>
            <div className="flex gap-x-4">
              <FormField
                control={control}
                name="number.0"
                render={({ field: { value, onChange } }) => (
                  <FormControl>
                    <Input
                      defaultValue={value}
                      maxLength={1}
                      className="w-10"
                      onKeyDown={(e) =>
                        onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                      }
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={control}
                name="number.1"
                render={({ field: { value, onChange } }) => (
                  <FormControl>
                    <Input
                      defaultValue={value}
                      maxLength={1}
                      className="w-10"
                      onKeyDown={(e) =>
                        onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                      }
                    />
                  </FormControl>
                )}
              />
              {digit === "digit3" && (
                <FormField
                  control={control}
                  name="number.2"
                  render={({ field: { value, onChange } }) => (
                    <FormControl>
                      <Input
                        defaultValue={value}
                        maxLength={1}
                        className="w-10"
                        onKeyDown={(e) =>
                          onChange(numberOnlyRegex.test(e.key) ? e.key : "0")
                        }
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
