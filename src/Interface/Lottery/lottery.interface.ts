export interface ResultNumber {
    round: number;
    value: string;
}

export interface ResultSection {
    price: string;
    number: ResultNumber[];
}

export interface ResultReward {
    first: ResultSection;
    last3f: ResultSection;
    last3b: ResultSection;
    last2: ResultSection;
}

export interface ResultResponse {
    response: ResultData;
}

export interface ResultDate {
    date: string;
    month: string;
    year: string;
}

export interface ResultData {
    data: ResultReward;
    displayDate: ResultDate;
}

export interface IRewardLottery{
    first: string;
    last3f: string;
    last3b: string;
    last2: string;
    day: string;
    month: string;
    year: string;
}

export interface IUser{
    userAddr: string;
    dealerAddr?: string;
    balance: number;
}

