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

export interface AccountTypeInfoInterface { 
  label: string;
  icon: any;
  color: string; 
}

export const AccountTypeInfo: Record<AccountType, AccountTypeInfoInterface> = {
  [AccountType.SAVINGS]: { label: 'Cuenta Ahorro', icon: SavingIcon, color: '#34d399' },
  [AccountType.CHECKING]: { label: 'Cuenta Corriente', icon: CheckingIcon, color: '#3b82f6' },
  [AccountType.CREDIT]: { label: 'Tarjeta Crédito', icon: CreditIcon, color: '#ef4444' },
  [AccountType.CASH]: { label: 'Efectivo', icon: CashIcon, color: '#fbbf24' },
  [AccountType.DIGITAL]: { label: 'Digital', icon: DigitalIcon, color: '#6b7280' }
};