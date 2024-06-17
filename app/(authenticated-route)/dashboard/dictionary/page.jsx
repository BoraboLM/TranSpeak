import { OverallMetadata } from "@/data/dictionary-metadata/metadata";
import FooterDictionary from "./components/FooterDictionary";
import UploadAudio from "./components/UploadAudio";

export default async function AdminDictionary() {
    const data = await OverallMetadata();
    return (
        <div className="w-full px-4">
            <UploadAudio />
            <FooterDictionary data={data} />
        </div>
    )
}