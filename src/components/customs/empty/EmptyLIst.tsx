import { TagOutlined } from "@ant-design/icons"

type Props = {
    icon: React.ReactNode;
    title: string;
    description: string;
    example: string;
}

export default function EmptyList({ icon, title, description, example }: Props) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="rounded-full bg-slate-200 w-12 h-12 flex items-center justify-center">
                        {icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-2"> {title} </h3>

                    <p className="text-gray-700 mb-6 text-sm">
                        {description}
                    </p>
                    <div className="mt-6 text-xs text-gray-600">
                        {example}
                    </div>
                </div>
            </div>
        </div> 
    )
}