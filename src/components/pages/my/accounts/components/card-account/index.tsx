import { AccountType, AccountTypeInfo } from "@/src/utils/consts/AccountType";
import CardAccountInterface from "../../interfaces/card-account";
import { getColorClasses } from "@/src/utils/shared/accountShared";
import { Card, Dropdown, Button, Modal } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";
import useAccountActions from "../../hooks/useAccountActions";
import { useEffect } from "react";

type Props = {
    account: CardAccountInterface;
    onEdit?: (account: CardAccountInterface) => void;
    onDelete?: () => void;
}

export default function CardAccount({ account, onEdit, onDelete }: Props) {

    const isNegative = account.balance < 0
    const colors = getColorClasses(account.color, isNegative)
    const { hasTransactions, checkAccountTransactions, deleteAccount, loading } = useAccountActions();

    const accountType = AccountTypeInfo[account.type];
    const Icon = accountType.icon;

    useEffect(() => {
        checkAccountTransactions(account.id);
    }, [account.id]);

    const handleEdit = () => {
        if (onEdit) {
            onEdit(account);
        }
    };

    const handleDelete = () => {
        Modal.confirm({
            title: '¿Estás seguro de eliminar esta cuenta?',
            content: `Se eliminará permanentemente la cuenta "${account.name}". Esta acción no se puede deshacer.`,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            okType: 'danger',
            onOk: () => {
                deleteAccount(account.id, account.name, () => {
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
            disabled: hasTransactions[account.id] === true,
            danger: true
        }
    ];

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200/60 hover:border-slate-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 overflow-hidden">
            {/* Gradient Background Accent */}
            <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-80"
                style={{background: `linear-gradient(90deg, ${accountType.color}, ${accountType.color}80)`}}
            />
            
            {/* Card Content */}
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200/50 transition-transform duration-300 group-hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${accountType.color}, ${accountType.color}dd)`
                            }}
                        >
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
                                {account.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span 
                                    className="text-xs font-medium px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${accountType.color}15`,
                                        color: accountType.color
                                    }}
                                >
                                    {accountType.label}
                                </span>
                                {account.bank && (
                                    <span className="text-xs text-slate-500">• {account.bank}</span>
                                )}
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

                {/* Balance Section */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-slate-900">
                            {formatCurrency(account.balance)}
                        </span>
                        {isNegative && (
                            <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                Deuda
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500">Balance actual</p>
                    {account.accountNumber && (
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                            ••• {account.accountNumber.length > 4 && account.accountNumber.slice(-4)}
                        </p>
                    )}
                </div>

                {/* Credit Card Details */}
                {account.type === AccountType.CREDIT && (
                    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-700">Límite de Crédito</span>
                            <span className="text-sm font-bold text-slate-900">
                                {formatCurrency(account.creditLimit)}
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500 ease-out"
                                    style={{ 
                                        width: `${Math.min((Math.abs(account.balance) / account.creditLimit) * 100, 100)}%`,
                                        background: `linear-gradient(90deg, ${
                                            (Math.abs(account.balance) / account.creditLimit) > 0.8 
                                                ? '#ef4444' 
                                                : (Math.abs(account.balance) / account.creditLimit) > 0.6 
                                                    ? '#f59e0b' 
                                                    : '#10b981'
                                        }, ${
                                            (Math.abs(account.balance) / account.creditLimit) > 0.8 
                                                ? '#dc2626' 
                                                : (Math.abs(account.balance) / account.creditLimit) > 0.6 
                                                    ? '#d97706' 
                                                    : '#059669'
                                        })`
                                    }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-slate-500">
                                    Usado: {Math.round((Math.abs(account.balance) / account.creditLimit) * 100)}%
                                </span>
                                <span className="text-xs font-medium text-emerald-600">
                                    Disponible: {formatCurrency(account.creditLimit - Math.abs(account.balance))}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}