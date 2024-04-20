import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TriangleAlert } from 'lucide-react';
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export function ErrorCard() {
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-col gap-4" >
                        <span className="xl:text-6xl lg:text-4xl md:text-2xl sm:text-xl font-[500px] text-wrap"> Oops! Something went wrong!</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex justify-center items-center">
                        <TriangleAlert size={80} className="text-destructive" />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center items-center w-full min-w-[120px]">
                        <Link href="/" passHref>
                            <Button variant="ghost" size="default" className="flex items-center gap-2">
                                <ChevronLeft size={20} />
                                <span>Go back to home</span>
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}