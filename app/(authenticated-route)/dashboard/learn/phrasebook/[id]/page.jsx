export default async function PhrasebookCard({ params }) {
    return (
        <div className="flex w-full flex-col h-full justify-center items-center p-8">
            <h1 className="text-[40px] text-gray-800 font-[600] tracking-widest">You are now in {params.id}</h1>
            <h1 className="text-center text-[30px] text-slate-950/80 font-[700] tracking-wider "> Shet ang hirap nung recommendation ni sir Jann</h1>
        </div>
    )
}