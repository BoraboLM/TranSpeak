
export default async function IlocanoPhrases({ params }) {
    const words = params.title.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const originalTitle = capitalizedWords.join(' ');
    return (
        <div className=" w-full sm:w-[90%] md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%] mx-auto min-h-[90vh] md:h-1/2 lg:h-[85%] ">
            <h1>{originalTitle}</h1>
        </div>
    )
}