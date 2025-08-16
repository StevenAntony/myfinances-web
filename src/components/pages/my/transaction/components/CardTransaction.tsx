'use client'
import { Badge, Button, Dropdown, Modal } from "antd"
import { CalendarOutlined, FallOutlined, RiseOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { CardTransactionInterface } from "../interfaces/card-transaction"
import formatCurrency from "@/src/utils/shared/formats/formatCurrency"
import useTransactionActions from "../hooks/useTransactionActions"

type Props = {
    transaction: CardTransactionInterface;
    onEdit?: (transaction: CardTransactionInterface) => void;
    onDelete?: () => void;
}

const getAccountIcon = (accountType: string) => {
    switch (accountType) {
        case "bank":
        case "savings":
            return "🏦"
        case "credit":
            return "💳"
        case "debit":
            return "💳"
        case "cash":
            return "💵"
        default:
            return "💰"
    }
}

export default function CardTransaction({ transaction, onEdit, onDelete }: Props) {
    const [modal, contextHolder] = Modal.useModal();
    const { deleteTransaction, loading } = useTransactionActions();

    const handleEdit = () => {
        if (onEdit) {
            onEdit(transaction);
        }
    };

    const handleDelete = async () => {
        await modal.confirm({
            title: '¿Estás seguro de eliminar esta transacción?',
            content: `Se eliminará permanentemente la transacción "${transaction.description}". Esta acción no se puede deshacer.`,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            okType: 'danger',
            onOk: () => {
                deleteTransaction(transaction.id, transaction.description, () => {
                    if (onDelete) {
                        onDelete();
                    }
                });
            }
        });
    };

    const menuItems = [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Editar',
            onClick: handleEdit
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Eliminar',
            onClick: handleDelete,
            danger: true
        }
    ];

    return (
        <div className="group relative bg-white rounded-sm border border-slate-200/60 hover:border-slate-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 overflow-hidden">
            {contextHolder}
            
            {/* Gradient Background Accent */}
            <div 
                className={`absolute top-0 left-0 right-0 h-[2px] opacity-80 ${
                    transaction.type === "income" 
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
                        : "bg-gradient-to-r from-red-500 to-red-400"
                }`}
            />
            
            {/* Card Content */}
            <div className="p-4 sm:p-6">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                                    transaction.type === "income" ? "bg-emerald-100" : "bg-red-100"
                                }`}
                            >
                                {transaction.type === "income" ? (
                                    <RiseOutlined className="text-2xl !text-emerald-600" />
                                ) : (
                                    <FallOutlined className="text-2xl !text-red-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 truncate text-sm">
                                    {transaction.description}
                                </h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <Badge 
                                        color={transaction.type === "income" ? "green" : "red"}
                                        text={transaction.category}
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Actions Dropdown */}
                        <Dropdown
                            menu={{ items: menuItems }}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <Button 
                                type="text" 
                                icon={<MoreOutlined />} 
                                size="small"
                                loading={loading}
                                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                            />
                        </Dropdown>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <CalendarOutlined className="w-3 h-3" />
                                {new Date(transaction.date).toLocaleDateString('es-ES', { 
                                    day: '2-digit', 
                                    month: 'short' 
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <span>{getAccountIcon(transaction.accountType)}</span>
                                <span className="truncate max-w-20">{transaction.account}</span>
                            </span>
                        </div>
                        <div className="text-right">
                            <div
                                className={`text-lg font-bold ${
                                    transaction.type === "income" ? "text-emerald-600" : "text-red-600"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div
                            className={`w-14 h-14 rounded-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                                transaction.type === "income" 
                                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
                                    : "bg-gradient-to-br from-red-500 to-red-600"
                            }`}
                        >
                            {transaction.type === "income" ? (
                                <RiseOutlined className="text-2xl" style={{ color: '#fff' }} />
                            ) : (
                                <FallOutlined className="text-2xl" style={{ color: '#fff' }} />
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-slate-800 transition-colors">
                                    {transaction.description}
                                </h3>
                                <Badge 
                                    color={transaction.type === "income" ? "green" : "red"}
                                    text={transaction.category}
                                    className="text-sm font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-6 text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <CalendarOutlined className="w-4 h-4" />
                                    {new Date(transaction.date).toLocaleDateString('es-ES', { 
                                        day: '2-digit', 
                                        month: 'long', 
                                        year: 'numeric' 
                                    })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-base">{getAccountIcon(transaction.accountType)}</span>
                                    <span className="font-medium">{transaction.account}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div
                                className={`text-2xl font-bold ${
                                    transaction.type === "income" ? "text-emerald-600" : "text-red-600"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                {transaction.type === "income" ? "Ingreso" : "Gasto"}
                            </p>
                        </div>
                        
                        {/* Actions Dropdown */}
                        <Dropdown
                            menu={{ items: menuItems }}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <Button 
                                type="text" 
                                icon={<MoreOutlined />} 
                                size="small"
                                loading={loading}
                                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}