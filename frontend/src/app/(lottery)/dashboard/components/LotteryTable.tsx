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
    
export function LotteryTable() {
    const myLottery = useLottery();

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
                        </TableRow>
                        ))}
                </>
                )
            }
        </TableBody>
        </Table>
)
}
