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
import useMyLastLottery from "../hooks/useMyLastLottery";

export function MyLottery() {
    const { myLottery } = useMyLastLottery();

    return (
        <>
            <div className='p-5'>
                <div className='py-3'>My Lottery List</div>
                <div className="overflow-y-auto h-[450px]">
                    <Table className="">
                    {myLottery && myLottery.length === 0 && (
                            <TableCaption>งวดที่แล้วไม่ได้ซื้อสลาก ;-; </TableCaption>
                    )}
                    {myLottery && myLottery.length > 0 && (
                            <TableCaption>A list of your Lottery.</TableCaption>
                    )}
                    <TableHeader className="sticky top-0">
                        <TableRow>
                        <TableHead className="w-[100px]">เลข</TableHead>
                        <TableHead>รูปแบบ</TableHead>
                        <TableHead>Bet</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>จำนวน</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { myLottery && myLottery.length > 0 && (<>
                            {myLottery.map((lottery) => (
                            <TableRow key={lottery.id}>
                            <TableCell className="font-medium">{lottery.baitNumber}</TableCell>
                                <TableCell className="pl-5">{lottery.playType}</TableCell>
                                <TableCell>{lottery.baitValue}</TableCell>
                                <TableCell>{lottery.arrangeType}</TableCell>
                                <TableCell>{lottery.amount}</TableCell>
                            </TableRow>
                        ))}
                        </>)}
                    </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}
