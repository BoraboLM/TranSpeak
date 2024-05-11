import Link from "next/link";
import Card from "./Card";

export default function CardList({ title, description, buttonName, data, link }) {
    const url = title.toLowerCase();
    return (
        <>
            <Card
                title={title}
                description={description}
                button={buttonName}
                link={link}
            >
                <div className="w-full flex ">
                    <div className=" gap-4 p-2">
                        {data.length === 0 ? (
                            <div className="text-xl font-[500] tracking-normal text-slate-500/60">No current module</div>
                        ) : (
                            data.slice(0, 5).map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <Link href={`learn/${url}/${item.id}`}>
                                        <h1 className="text-xl font-[700] tracking-wide py-2 hover:text-indigo-400 ease-in-out">
                                            {item.title} :
                                            <span className="cursor-pointer text-xl font-[500]"> {item.description}</span>
                                        </h1>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Card>

        </>
    )
}