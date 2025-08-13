import {
    AimOutlined,
    BarChartOutlined,
    BookOutlined,
    CalculatorOutlined,
    CreditCardOutlined,
    FileTextOutlined,
    HomeOutlined,
    PieChartOutlined,
    SignatureOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';

export interface MenuItem {
    key: string;
    label: string;
    icon: React.ComponentType;
}

export const menuItems: MenuItem[] = [
    { key: "dashboard", label: "Dashboard", icon: HomeOutlined },
    { key: "transactions", label: "Transacciones", icon: CreditCardOutlined },
    { key: "categories", label: "Categorías", icon: FileTextOutlined },
    { key: "budgets", label: "Presupuestos", icon: CalculatorOutlined },
    { key: "goals", label: "Metas", icon: AimOutlined },
    { key: "reports", label: "Reportes", icon: BarChartOutlined },
    { key: "analytics", label: "Análisis", icon: PieChartOutlined },
    { key: "accounts", label: "Cuentas", icon: WalletOutlined },
    { key: "loans", label: "Préstamos", icon: SignatureOutlined },
    { key: "documentation", label: "Documentación", icon: BookOutlined },
];

export const getMenuItems = (): MenuProps['items'] => {
    return menuItems.map(item => ({
        key: item.key,
        label: item.label,
        icon: React.createElement(item.icon),
    }));
};
