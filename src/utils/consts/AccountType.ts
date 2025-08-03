import CashIcon from '@/src/components/icons/account/CashIcon';
import CheckingIcon from '@/src/components/icons/account/CheckingIcon';
import CreditIcon from '@/src/components/icons/account/CreditIcon';
import DigitalIcon from '@/src/components/icons/account/Digital';
import SavingIcon from '@/src/components/icons/account/SavingIcon';

export enum AccountType {
  SAVINGS = 'savings',
  CHECKING = 'checking',
  CREDIT = 'credit',
  CASH = 'cash',
  DIGITAL = 'digital',
}

export const AccountIcon: Record<AccountType, any> = {
  [AccountType.SAVINGS]: SavingIcon,
  [AccountType.CHECKING]: CheckingIcon,
  [AccountType.CREDIT]: CreditIcon,
  [AccountType.CASH]: CashIcon,
  [AccountType.DIGITAL]: DigitalIcon
}

export const AccountTypeInfo: Record<AccountType, { label: string, icon: string, color: string }> = {
  [AccountType.SAVINGS]: { label: 'Cuenta Ahorro', icon: 'savings', color: '#34d399' },
  [AccountType.CHECKING]: { label: 'Cuenta Corriente', icon: 'checking', color: '#3b82f6' },
  [AccountType.CREDIT]: { label: 'Tarjeta Crédito', icon: 'credit', color: '#ef4444' },
  [AccountType.CASH]: { label: 'Efectivo', icon: 'cash', color: '#fbbf24' },
  [AccountType.DIGITAL]: { label: 'Digital', icon: 'digital', color: '#6b7280' }
};