import SummaryCard from "@/components/common/summary-card";
import { TypeSummary } from "@/components/common/summary-card/Props";
import summary from "./summary.json";

type Props = {}

export default function Summary({}: Props) {
  return (
    <div className="flex flex-wrap justify-between">
        {
            summary.map((item, index) => (
                <div className="w-1/4 p-2" key={index}>
                    <div className="shadow-md">
                        <SummaryCard 
                            title={item.title}
                            description={item.description}
                            percentage={item.percentage}
                            type={item.type === "positive" ? TypeSummary.POSITIVE : TypeSummary.NEGATIVE}
                        />
                    </div>
                </div>
            ))
        }
    </div>
  )
}