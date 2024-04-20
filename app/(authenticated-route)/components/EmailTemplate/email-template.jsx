export function EmailTemplate({ firstName, linkType, type }) {
    return (
        <div className="flex justify-center items-center py-[20px]">
            <span>Hi, {firstName}!</span>
            <br />
            <span>Click <a href={linkType}>here</a> to {type} your account</span>
        </div>
    )
}