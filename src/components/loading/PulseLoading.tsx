type Props = {
    text?: string;
    isLoading?: boolean;
    children: React.ReactNode;
}

export default function PulseLoading({ text, children, isLoading }: Props) {
    return (
        <div className="content-loading-custom h-full relative">
            {
                isLoading && (
                    <div className={`flex items-center bg-slate-200 z-10 justify-center absolute top-0 bottom-0 left-0 right-0`}>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-sky-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-3 h-3 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-3 h-3 bg-sky-500 rounded-full animate-bounce"></div>
                        </div>
                        {text && <p className="ml-4 text-sm text-[#71717a]">{text}</p>}
                    </div>
                )
            }
            {children}
        </div>
    )
}