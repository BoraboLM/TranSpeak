import Card from "./Card";

export default function CardList() {
    return (
        <>
            <Card
                title={"Ilocano"}
                description={"List of Ilocano Learning Modules"}
            >
                <div className="w-full flex ">
                    <div className="flex flex-col gap-4 p-2">
                        <span className=" cursor-pointer text-xl font-[500]">Lesson 1 - Easy - Sept 12.</span>
                        <span className=" cursor-pointer text-xl font-[500]">Lesson 2 - Easy</span>
                        <span className=" cursor-pointer text-xl font-[500]">Lesson 3 - Intermediate</span>
                    </div>
                </div>
            </Card>

        </>
    )
}