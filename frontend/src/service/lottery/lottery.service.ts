import { ResultResponse } from "@/interface/lottery/lottery.interface";
import { fetchJson } from "@/lib/fetch";

export const getLotteryData = () => {
  return fetchJson<ResultResponse>("https://www.glo.or.th/api/lottery/getLatestLottery", "POST");
};
