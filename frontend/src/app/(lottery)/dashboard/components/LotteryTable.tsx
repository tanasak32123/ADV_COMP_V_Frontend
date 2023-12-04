"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"
import useLottery from "../hooks/useLottery";
    
const invoices = [
{
    id: 1,
    paymentLottery: "12",
    paymentBet: "2",
    paymentMethod: "โต๊ด",
    paymentAmount: "2",
    paymentPrice: "10"
},
{
    id: 2,
    paymentLottery: "234",
    paymentBet: "1",
    paymentMethod: "เต๊ง",
    paymentAmount: "3",
    paymentPrice: "20"
},
{
    id: 3,
    paymentLottery: "455",
    paymentBet: "4",
    paymentMethod: "เต๊ง",
    paymentAmount: "1",
    paymentPrice: "4"
},
{
    id: 4,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
},
{
    id: 5,
    paymentLottery: "455",
    paymentBet: "4",
    paymentMethod: "เต๊ง",
    paymentAmount: "1",
    paymentPrice: "4"
},
{
    id: 6,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
},
{
    id: 7,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
},
{
    id: 8,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
},
{
    id: 9,
    paymentLottery: "455",
    paymentBet: "4",
    paymentMethod: "เต๊ง",
    paymentAmount: "1",
    paymentPrice: "4"
},
{
    id: 10,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
},
{
    id: 11,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
}
]

export function LotteryTable() {
    const myLottery = useLottery();
    // console.log(myLottery);

    return (
        <Table className="">
        <TableCaption>A list of your Lottery.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">เลข</TableHead>
            <TableHead>รูปแบบ</TableHead>
            <TableHead>Bet</TableHead>
            <TableHead>ประเภท</TableHead>
            <TableHead>จำนวน</TableHead>
            {/* <TableHead className="text-right">ราคา</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {myLottery && myLottery.length > 0 && (
                <>
                    {myLottery.map((lottery) => (
                        <TableRow key={lottery.id}>
                            <TableCell className="font-medium">{lottery.baitNumber}</TableCell>
                            <TableCell className="pl-5">{lottery.playType}</TableCell>
                            <TableCell>{lottery.baitValue}</TableCell>
                            <TableCell>{lottery.arrangeType}</TableCell>
                            <TableCell>{lottery.amount}</TableCell>
                            {/* <TableCell className="text-right">{invoice.paymentPrice}</TableCell> */}
                        </TableRow>
                        ))}
                </>
                )
            }
        </TableBody>
        </Table>
)
}
