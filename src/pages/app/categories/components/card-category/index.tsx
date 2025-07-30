import { Button } from "antd";
import CardCategoryInterface from "../../interfaces/card-category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {
    category: CardCategoryInterface;
    deleteCategory: ( id: number ) => void;
    loadingDeleteCategory: boolean;
}

const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: any } = {
        red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", progress: "bg-red-500" },
        blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", progress: "bg-blue-500" },
        yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", progress: "bg-yellow-500" },
        purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", progress: "bg-purple-500" },
        green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", progress: "bg-green-500" },
        emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-800",
            progress: "bg-emerald-500",
        },
    }
    return colorMap[color] || colorMap.blue
}

export default function CardCategory({ category, deleteCategory, loadingDeleteCategory }: Props) {

    const colors = getColorClasses(category.color)
    const percentage = category.budget > 0 ? (category.monthlySpent / category.budget) * 100 : 0
    const isOverBudget = percentage > 100


    return (
        <div key={category.id} className={`card-custom !${colors.border} !${colors.bg}`}>
            <div className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                            <h3 className={`font-semibold ${colors.text}`}>{category.name}</h3>
                            <p className="text-xs text-slate-500">Gasto</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button  className="h-8 w-8">
                            <EditOutlined className="w-3 h-3" />
                        </Button>
                        <Button  
                            className="h-8 w-8 text-red-600" 
                            onClick={() => deleteCategory(category.id as number)}
                            loading={loadingDeleteCategory}
                        >
                            <DeleteOutlined className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Gastado este mes</p>
                        <p className={`text-2xl font-bold ${colors.text}`}>${category.monthlySpent.toFixed(2)}</p>
                    </div>

                    {(category.budget > 0 && category.type === "expense") && (
                        <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Presupuesto</span>
                                <span>${category.budget.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${isOverBudget ? "bg-red-500" : colors.progress}`}
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                ></div>
                            </div>
                            <p className={`text-xs mt-1 ${isOverBudget ? "text-red-600" : "text-slate-500"}`}>
                                {percentage.toFixed(1)}% del presupuesto
                                {isOverBudget && ` (Excedido por $${(category.monthlySpent - category.budget).toFixed(2)})`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}