import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { PangasinanData, IlocanoData } from "@/data/phrasebook-data"
import { Undo2 } from "lucide-react";
import Link from "next/link"

export default async function SidebarData() {
    const [pangData, iloData] = await Promise.all([
        PangasinanData(),
        IlocanoData()
    ]);

    const uniquePangData = pangData.filter((item, index, self) =>
        index === self.findIndex((t) => t.title === item.title)
    );

    const uniqueIloData = iloData.filter((item, index, self) =>
        index === self.findIndex((t) => t.title === item.title)
    );
    return (
        <div className="w-full tracking-wide px-2">
            <div className="flex flex-row items-center text-[25px] font-[600]">
                <Link href='/learn' className="flex flex-row text-white items-center text-start hover:text-slate-800/80 ease-in-out duration-300">Return <Undo2 className="ml-2" /></Link>
            </div>
            <Accordion type="multiple" >
                <AccordionItem value={'Pangasinan'}>
                    <AccordionTrigger className="text-white font-[900] text-2xl uppercase">Pangasinan</AccordionTrigger>
                    <AccordionContent className="text-white flex flex-col gap-4 font-[600] px-2 text-nowrap">
                        {pangData.length > 0 ? (
                            uniquePangData.map((item, index) => (
                                <Link key={index} href={`/learn/pangasinan/${item.title.replace(' ', '-').toLowerCase()}`} className="hover:text-slate-800/80 ease-in-out duration-200" replace>
                                    - {item.title}
                                </Link>
                            ))
                        ) : (
                            <span className="text-muted cursor-default">No Phrasebook Available</span>
                        )}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={'Ilocano'}>
                    <AccordionTrigger className="text-white font-[900] text-2xl uppercase">Ilocano</AccordionTrigger>
                    <AccordionContent className="text-white flex flex-col gap-4 font-[600] px-2 text-nowrap">
                        {iloData.length > 0 ? (
                            uniqueIloData.map((item, index) => (
                                <Link key={index} href={`/learn/ilocano/${item.title.replace(' ', '-').toLowerCase()}`} className="hover:text-slate-800/80 ease-in-out duration-200" replace>
                                    - {item.title}
                                </Link>
                            ))
                        ) : (
                            <span className="text-muted cursor-default">No Phrasebook Available</span>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}