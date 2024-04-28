"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState, //used for sorting
    getSortedRowModel, //used for sorting
    ColumnFiltersState, //used for filtering
    getFilteredRowModel, //used for filtering
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { DataTablePagination } from "./pagination"


export function DataTable({
    columns,
    data,
}) {
    const [sorting, setSorting] = useState([]); //used for sorting
    const [columnFilters, setColumnFilters] = useState([]) //used for filtering

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting, // used for sorting
        getSortedRowModel: getSortedRowModel(), // used for sorting
        onColumnFiltersChange: setColumnFilters, // used for filtering
        getFilteredRowModel: getFilteredRowModel(), // used for filtering
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div>
            <div className="rounded-[30px] px-6 py-2">
                {/* Table  */}
                <h1 className="text-2xl font-[700] tracking-wide py-4">Users Activity Logs</h1>
                <Input
                    placeholder="Search and Filter names..."
                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm ring-offset-indigo-500 ring-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-indigo-500 ease-in-out duration-100 font-[500] mb-4"
                />
                <Table >
                    <TableHeader >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-indigo-200 text-slate-950">
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b-2 border-white hover:bg-indigo-300 hover:text-slate-950"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex items-center justify-center content-center flex-col">
                                        <span className="text-xl font-semibold tracking-wide py-[20px]">No results.</span>
                                        <Image src={'/confused.gif'} alt='NotFound' width={868} height={426} priority className=' px-6' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-end space-x-2 py-4 px-10">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
