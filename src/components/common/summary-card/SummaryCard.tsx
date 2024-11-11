import Image from "next/image"
import Props, { TypeSummary } from "./Props"

export default function SummaryCard({...props}: Props) {
    const iconArrow = props.type === TypeSummary.POSITIVE ? "pi pi-arrow-up" : "pi pi-arrow-down";
    const backgroundType = props.type === TypeSummary.POSITIVE ? "bg-emerald-600" : "bg-red-600";
    const image = props.type === TypeSummary.POSITIVE ? "/imgs/svg/rate-positive.svg" : "/imgs/svg/rate-negative.svg";

    return (
        <div className="p-6 flex justify-between items-center">
            <div>
                <p className="mb-4">{props.title}</p>            
                <div className="flex gap-2 items-center">
                    <span className={`${backgroundType} px-2 py-1 text-white rounded-md`}>
                        <span className={`pi ${iconArrow}`}></span>
                        <span className="ml-2">{props.percentage}%</span>
                    </span>
                    <p className="text-2xl">{props.description}</p>
                </div>
            </div>
            <div className="flex-1">
                <Image className="w-full" src={image} alt="" width={100} height={100} />
            </div>
        </div>
    )
}