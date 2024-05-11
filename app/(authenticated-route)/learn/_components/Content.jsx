import LearnPangasinan from "@/app/action/Learn/learnPangasinan"

export default async function Content() {
    const res = await LearnPangasinan();
    const modules = res.data.module;
    console.log(modules)
    return (
        <div className="flex flex-col ">
            {
                modules.filter(module => module.status === 'ACTIVE').length > 0 ? (
                    modules.map((module, index) => (
                        module.status === 'ACTIVE' ? (
                            <div key={index}>
                                <h2>{module.title}</h2>
                                <h1>{module.topic}</h1>
                                <p>{module.description}</p>
                            </div>
                        ) : null
                    ))
                ) : (
                    <p>No modules available</p>
                )
            }
        </div>
    )
}