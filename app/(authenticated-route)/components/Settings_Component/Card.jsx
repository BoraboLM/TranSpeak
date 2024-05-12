export default function CardSettings({ data }) {
    return (
        <>
            {data.data.map((item, index) => (
                <div key={index} className="bg-white shadow-md p-4 my-4 rounded-lg">
                    {/* count index */}
                    <span className="text-gray-400"></span>
                    <h2 className="text-xl font-bold">#{index + 1} {item.topic}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <span className="text-gray-400">{item.createdAt}</span>
                </div>
            ))}
        </>
    )
}