import FooterDictionary from "./components/FooterDictionary";
import UploadAudio from "./components/UploadAudio";

export default async function AdminDictionary() {
    const data = 'data'
    return (
        <div className="w-full px-4">
            <UploadAudio />
            <FooterDictionary data={data} />
        </div>
    )
}