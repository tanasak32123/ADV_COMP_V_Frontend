// export interface IBuyLottery {
//     id: number;
//     digit: string;
//     number: string;
//     bet: number;
//     type: string;
//     amount: number;
//     price: number;
// }

export enum PLAY_TYPE {
    ALL="All",
    FRONT="Front",
    BACK="Back"
}

export enum ARRANGE_TYPE {
    TOD="Tod",
    TENG="Teng"
}

export enum DIGIT_TYPE {
    TWO="Two",
    THREE="Three"
}

export interface IBuyLottery {
    baitNumber: string;
    baitAmount: number;
    baitValue: number;
    playType: PLAY_TYPE;
    arrangeType: ARRANGE_TYPE;
    digitType: DIGIT_TYPE;
}