'use client'
import { WalletOutlined } from "@ant-design/icons"
import CardAccount from "./components/card-account"
import { Card } from "antd"
import { useAccountPageContext } from "./contexts/AccountPageContext"
import formatCurrency from "@/src/utils/shared/formats/formatCurrency"
import { AccountType, AccountTypeInfo } from "@/src/utils/consts/AccountType"
import CardTypeAccount from "./components/card-type-account"
import EmptyList from "@/src/components/customs/empty/EmptyLIst"
import { FinancialLoader } from "@/src/components/loading/FinancialLoader"
import AccountSkeleton from "@/src/components/loading/skeleton/AccountSkeleton"

export default function ListAccount() {
    const { accounts, loadingListAccount, refreshAccounts, setSelectedAccount, openForm } = useAccountPageContext();

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    const summaryType = (type: AccountType): number => {
        const finResult = accounts.filter(account => account.type === type);

        return finResult.reduce((sum, account) => sum + account.balance, 0);
    }

    if (loadingListAccount) {
        return (
          <div className="space-y-6">
            <div className="text-center py-4">
              <FinancialLoader message="Cargando cuentas..." size="md" />
            </div>
            <AccountSkeleton />
          </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Total Balance */}
            <Card className="border-slate-200">
                <div className="py-6">
                    <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">Balance Total</p>
                        <p className={`text-4xl font-bold ${totalBalance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {formatCurrency(totalBalance)}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Accounts Grid */}
                {
                    accounts.length === 0
                        ? (
                            <EmptyList
                                title="No tienes cuentas creadas"
                                description="Las cuentas te ayudan a saber donde se encuentra distribuido tu dinero. Crea tu primera cuenta para
                                            comenzar a controlar mejor tus finanzas."
                                example="Ejemplos: Cuenta ahorro, efectivo, Cuenta ahorro secundario"
                                icon={<WalletOutlined className="text-xl" />}
                            />
                        )
                        : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {accounts.map((account) => (
                                    <CardAccount 
                                        account={account} 
                                        key={account.id}
                                        onEdit={(account) => {
                                            setSelectedAccount(account);
                                            openForm();
                                        }}
                                        onDelete={() => {
                                            refreshAccounts();
                                        }}
                                    />
                                ))}
                            </div>
                        )
                }

            {/* Account Summary */}
            <Card className="border-slate-200">
                <div className="mb-4">
                    <div className="text-2xl font-semibold text-slate-800">Resumen por Tipo de Cuenta</div>
                    <div className="text-slate-500">Distribución de tu dinero por tipo de cuenta</div>
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {
                            Object.entries(AccountTypeInfo).map(([key, info]) => (
                                <CardTypeAccount key={key} accountType={info} resumen={summaryType(key as AccountType)} />
                            ))
                        }
                    </div>
                </div>
            </Card>
        </div>
    )
}