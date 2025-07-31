import { BankOutlined, CreditCardOutlined, DollarCircleOutlined, FundViewOutlined, WalletOutlined } from "@ant-design/icons"
import { AccountType } from "../consts/AccountType"
import { ReactNode } from "react"

export const accountTypeIconData: Record<AccountType, ReactNode> = {
    [AccountType.SAVINGS]: <BankOutlined className="w-6 h-6" />,
    [AccountType.CHECKING]: <WalletOutlined className="w-6 h-6" />,
    [AccountType.CREDIT]: <CreditCardOutlined className="w-6 h-6" />,
    [AccountType.CASH]: <FundViewOutlined className="w-6 h-6" />,
    [AccountType.DIGITAL]: <DollarCircleOutlined className="w-6 h-6" />
}

export const accountTypeLabelsData: Record<AccountType, string> = {
  [AccountType.SAVINGS]: "Cuenta de Ahorros",
  [AccountType.CHECKING]: "Cuenta Corriente",
  [AccountType.CREDIT]: "Tarjeta de Crédito",
  [AccountType.CASH]: "Efectivo",
  [AccountType.DIGITAL]: "Cuenta Digital",
};