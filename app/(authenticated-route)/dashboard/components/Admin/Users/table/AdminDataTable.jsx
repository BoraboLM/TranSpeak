"use client"

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
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
import { Input } from "@/components/ui/input"
import { Suspense, useState } from "react"
import { CreateUser } from "../Modal/CreateUserModal"
import { UserDataTablePagination } from "./UserPagination"
import Loading from "@/app/(authenticated-route)/dashboard/Loading"

export function AdminDataTable({
    data,
    columns,
    title
}) {
    const [columnFilters, setColumnFilters] = useState([]) //used for filtering

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onColumnFiltersChange: setColumnFilters, // used for filtering
        getFilteredRowModel: getFilteredRowModel(), // used for filtering
        state: {
            columnFilters,
        },
    })

    return (
        <div className="rounded-md border">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-[700] tracking-wide py-4 px-4">{title}</h1>
                <CreateUser />
            </div>

            <Input
                placeholder="Search and Filter names..."
                value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm ring-offset-indigo-500 ring-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-indigo-500 ease-in-out duration-100 font-[500] mb-4 ml-4"
            />

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
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-indigo-200 hover:text-slate-950"
                            >
                                <Suspense fallback={<Loading />}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </Suspense>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-10">
                <UserDataTablePagination table={table} />
            </div>
        </div>
    )
}
