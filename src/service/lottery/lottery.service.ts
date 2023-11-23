import { ResultResponse } from "@/interface/Lottery/lottery.interface";
import { fetchJson } from "@/lib/fetch";

export const getLotteryData = () => {
  return fetchJson<ResultResponse>("https://www.glo.or.th/api/lottery/getLatestLottery", "POST");
};
