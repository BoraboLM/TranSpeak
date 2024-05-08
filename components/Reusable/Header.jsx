export default function Header({ title, description }) {
    return (
        <div className="w-[500px] rounded-lg bg-indigo-200 ml-4 flex justify-center text-center">
            <div className="flex flex-row justify-center items-center gap-2 font-500 text-xl tracking-wider text-slate-700">
                <span className="font-[800] text-2xl">{title}</span>
                <span className="font-[500]"> | </span>
                <span>{description}</span>
            </div>
        </div>
    )
}