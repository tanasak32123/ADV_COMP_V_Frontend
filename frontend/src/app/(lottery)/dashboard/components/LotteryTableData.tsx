"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IRewardLottery } from "@/interface/lottery/lottery.interface"
import useLottery from "../hooks/useLottery"
import { IBuyLottery } from "@/interface/lottery/buy_lottery.interface"

type Props = {
    reward: IRewardLottery;
}

// const data: Payment[] = [
//     {
//         id: 1,
//         lottery: "12",
//         bet: "2",
//         method: "โต๊ด",
//         amount: "2",
//         price: "10"
//     },
//     {
//         id: 2,
//         lottery: "234",
//         bet: "1",
//         method: "เต๊ง",
//         amount: "3",
//         price: "20"
//     },
//     {
//         id: 3,
//         lottery: "455",
//         bet: "4",
//         method: "เต๊ง",
//         amount: "1",
//         price: "4"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
//     {
//         id: 4,
//         lottery: "12",
//         bet: "5",
//         method: "โต๊ด",
//         amount: "1",
//         price: "20"
//     },
// ]


// export type Payment = {
//     id: number
//     lottery: string
//     bet: string
//     method: string
//     amount: string
//     price: string
// }

export const columns: ColumnDef<IBuyLottery>[] = [
  {
    accessorKey: "baitNumber",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            เลขที่ซื้อ
            <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
      },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("baitNumber")}</div>
    ),
  },
  {
    accessorKey: "baitValue",
    header: "Bet",
    cell: ({ row }) => <div className="lowercase">{row.getValue("baitValue")}</div>,
  },
  {
    accessorKey: "arrangeType",
    header: "ประเภท",
    cell: ({ row }) => <div className="lowercase">{row.getValue("arrangeType")}</div>,
  },
  {
    accessorKey: "amount",
    header: "จำนวน",
    cell: ({ row }) => <div className="lowercase">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">ราคา</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ETH",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function LotteryTableData({reward}: Props) {
  const myLottery = useLottery();
  console.log("lottery data");

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    myLottery,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const [page, setPage] = React.useState(0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-10 pb-4">
        <div className="col-start-2 col-span-3">
            <Input
            placeholder="ค้นหาสลาก"
            value={(table.getColumn("baitNumber")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("baitNumber")?.setFilterValue(event.target.value)
            }
            className="bg-[#D9D9D9] max-w-sm rounded-2xl w-2/3"
            />
        </div>
        <div className="flex items-center col-start-7 col-span-3 font-bold">งวดประจำวันที่ {reward.day} เดือน {reward.month} ปี {reward.year}</div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.slice(0,7).map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length} of{" "}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
