'use client'
import { Button } from "antd";
import CardCategoryInterface from "../../interfaces/card-category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";

type Props = {
    category: CardCategoryInterface;
    deleteCategory: ( id: number ) => void;
    loadingDeleteCategory: boolean;
}

export default function CardCategory({ category, deleteCategory, loadingDeleteCategory }: Props) {

    const percentage = category.budget > 0 ? (category.monthlySpent / category.budget) * 100 : 0
    const isOverBudget = percentage > 100


    return (
        <div key={category.id} className={`card-custom border`} style={{ borderColor: category.color }}>
            <div className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                            <h3 className={`font-semibold`} style={{color: category.color}}>{category.name}</h3>
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
                        <p className={`text-2xl font-bold`} style={{color: category.color}}>{ formatCurrency(category.monthlySpent) }</p>
                    </div>

                    {(category.budget > 0 && category.type === "expense") && (
                        <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Presupuesto</span>
                                <span>{ formatCurrency(category.budget) }</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full`}
                                    style={{ width: `${Math.min(percentage, 100)}%`, background: isOverBudget ? "bg-red-500" : category.color }}
                                ></div>
                            </div>
                            <p className={`text-xs mt-1 ${isOverBudget ? "text-red-600" : "text-slate-500"}`}>
                                {percentage.toFixed(1)}% del presupuesto
                                {isOverBudget && ` (Excedido por ${formatCurrency(category.monthlySpent - category.budget)})`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}