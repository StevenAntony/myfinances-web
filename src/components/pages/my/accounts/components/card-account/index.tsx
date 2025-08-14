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
        <Card key={account.id} style={{borderColor: accountType.color}}>
            <div className="pb-3">
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12  rounded-full flex items-center justify-center text-white`} style={{background: accountType.color}}>
                        <Icon />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <p className="text-xs text-slate-500">{accountType.label}</p>
                        </div>
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
                                className="text-slate-400 hover:text-slate-600"
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div>
                <div className="space-y-3">
                    <div>
                        <h3 className={`font-semibold text-[18px]`} style={{color: accountType.color}}>{account.name}</h3>
                        <p className="text-sm text-slate-600">{account.bank}</p>
                        {account.accountNumber !== "N/A" && (
                            <p className="text-xs text-slate-500">{account.accountNumber}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 mb-1">Balance Actual</p>
                        <p className={`text-2xl font-bold ${isNegative ? "text-red-600" : ''}`} style={{color: accountType.color}}>
                            {formatCurrency(account.balance)}
                            {isNegative && <span className="text-sm ml-1">(Deuda)</span>}
                        </p>
                    </div>

                    {account.type === AccountType.CREDIT && (
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Límite de Crédito</p>
                            <p className="text-sm text-slate-700">{ formatCurrency(account.creditLimit) }</p>
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${(Math.abs(account.balance) / account.creditLimit) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Disponible: { formatCurrency((account.creditLimit - Math.abs(account.balance))) }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}