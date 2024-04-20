import CustomButton from "@/components/button/CustomButton";
import styles from "./root.module.css"
import Link from "next/link"

export default function Page() {
    return (
        <section className={`${styles.gradient} h-screen w-screen flex justify-center items-center content-center flex-col gap-[20px] text-wrap`}>
            <span className="xl:text-6xl font-semibold lg:text-4xl md:text-2xl sm:text-xl">Explore and feel the BEAUTY of <Link href="https://www.seepangasinan.com" target="_blank" className=" decoration-indigo-500 hover:underline ease-in-out duration-400 cursor-pointer">PANGASINAN</Link></span>
            <CustomButton />
        </section>
    )
}