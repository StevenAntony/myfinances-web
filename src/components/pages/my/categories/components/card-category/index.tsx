'use client'
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import CardCategoryInterface from "../../interfaces/card-category";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";
import { EllipsisVertical } from "lucide-react";

type Props = {
    category: CardCategoryInterface;
    loadingDeleteCategory: boolean;
    actionsMenu: MenuProps['items'];
    setSelectedCategory: ( category: CardCategoryInterface | null ) => void;
}

export default function CardCategory({ category, loadingDeleteCategory, actionsMenu, setSelectedCategory }: Props) {

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
                        <Dropdown
                            menu={{items: actionsMenu}} 
                            onOpenChange={(open) => {
                                setSelectedCategory(category)
                            }}
                            placement="bottomRight"
                            trigger={['click']}          
                        >
                             <Button 
                                type="text" 
                                icon={<EllipsisVertical size={16} />} 
                                size="small"
                                loading={loadingDeleteCategory}
                                className="text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
                            />
                        </Dropdown>                   
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