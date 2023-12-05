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
import React from "react";
import { useWeb3Store } from "@/state/web3Store";
    
export function LotteryTable() {
    const {myLottery,loading,fetchMylotteries} = useLottery();
    const {address} = useWeb3Store();

    React.useEffect(() => {
        if (!address) return;
        fetchMylotteries();
    },[address,fetchMylotteries])


    return (
        <Table className="">
        <TableCaption>{loading ? "Loading ...": (myLottery && myLottery.length === 0) ? "คุณยังไม่มีสลาก ;-;" : "A list of your Lottery."}</TableCaption>
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
