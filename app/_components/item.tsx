interface ItemProps {
    data: DecisionItem
}

export default function Item({ data }: ItemProps) {
    return (
        <a href={data.link} className="p-6 bg-white border border-gray-200 rounded-lg shadow block" target="_blank" rel="nofollow noopener">
            <div className="text-xs mb-2">
                {data.dates.map((date, i) => (
                    <div key={i}>{date}</div>
                ))}
            </div>
            <h4 className="font-bold text-blue-700 text-sm mb-3">
                {data.title}
            </h4>
            {data.details && (
                <div className="text-xs">
                    {data.details.map((detail, i) => (
                        <div key={i}>{detail}</div>
                    ))}
                </div>
            )}

            <div className="flex items-center mt-5 space-x-5">
                <div className="flex items-center text-sm space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                        {data.totalViews}
                    </div>
                </div>
                <div className="flex items-center text-sm space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <div>
                        {data.totalDownloads}
                    </div>
                </div>
            </div>
        </a>
    )
}
