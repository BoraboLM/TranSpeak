"use client";

import { Loading } from "@/app/Loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense, useEffect, useState } from "react";

export default function UserActivity({ user_data }) {
    const rowPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(user_data.length / rowPerPage);

    const startIndex = (currentPage - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;

    useEffect(() => {
        setCurrentPage(1);
    }, [user_data]);

    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Number of pages to show around current page

        if (totalPage <= maxPagesToShow + 4) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push("...");
            }
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPage - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            if (currentPage < totalPage - 2) {
                pages.push("...");
            }
            pages.push(totalPage);
        }
        return pages;
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="">
                        <TableHead className="text-center font-[700] text-black tracking-wide">
                            No.
                        </TableHead>
                        <TableHead className="font-[700] text-black tracking-wide">
                            Action
                        </TableHead>
                        <TableHead className="font-[700] text-black tracking-wide">
                            Information
                        </TableHead>
                        <TableHead className="text-left font-[700] text-black tracking-wide">
                            Type
                        </TableHead>
                        <TableHead className="text-left font-[700] text-black tracking-wide">
                            Date - Time
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <Suspense fallback={<Loading />}>
                        {user_data.slice(startIndex, endIndex).map((item, index) => {
                            const actualIndex = startIndex + index + 1;
                            return (
                                <TableRow
                                    key={index}
                                    className="hover:bg-indigo-200 ease-in-out duration-300 cursor-default"
                                >
                                    <TableCell className="font-medium text-center">
                                        {actualIndex}
                                    </TableCell>
                                    <TableCell className="text-left">{item.action}</TableCell>
                                    <TableCell className="text-left">{item.information}</TableCell>
                                    <TableCell className="text-left">{item.action}</TableCell>
                                    <TableCell className="text-left">
                                        {item.createdAt.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </Suspense>
                </TableBody>
            </Table>

            <Pagination className={"mt-2 p-4"}>
                <div className="w-full min-h-full flex flex-1 justify-start items-center px-6 font-semibold">
                    Total Items: {user_data.length}
                </div>
                <PaginationContent className="flex justify-center">
                    <PaginationItem>
                        <PaginationPrevious
                            className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none" : undefined
                                }`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                    </PaginationItem>

                    {generatePageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {page === "..." ? (
                                <span className="mx-2">...</span>
                            ) : (
                                <PaginationLink
                                    className={`cursor-pointer ${currentPage === page ? "active" : undefined
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            className={`cursor-pointer ${currentPage === totalPage ? "pointer-events-none" : undefined
                                }`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
