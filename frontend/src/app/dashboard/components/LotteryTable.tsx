import {
Table,
TableBody,
TableCaption,
TableCell,
TableFooter,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"

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
    id: 4,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
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
    id: 4,
    paymentLottery: "12",
    paymentBet: "5",
    paymentMethod: "โต๊ด",
    paymentAmount: "1",
    paymentPrice: "20"
}
]

export function LotteryTable() {
return (
    <Table className="">
    <TableCaption>A list of your Lottery.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">เลขที่ซื้อ</TableHead>
        <TableHead>bet</TableHead>
        <TableHead>ประเภท</TableHead>
        <TableHead>จำนวน</TableHead>
        <TableHead className="text-right">ราคา</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {invoices.map((invoice) => (
        <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.paymentLottery}</TableCell>
            <TableCell>{invoice.paymentBet}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.paymentAmount}</TableCell>
            <TableCell className="text-right">{invoice.paymentPrice}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    {/* <TableFooter>
        <TableRow>
        <TableCell colSpan={4} className="font-bold">Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
    </TableFooter> */}
    </Table>
)
}
