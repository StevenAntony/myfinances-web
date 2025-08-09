import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';

export interface ProfileMenuAction {
    onProfile: () => void;
    onSettings: () => void;
    onLogout: () => void;
}

export const getProfileMenuItems = (actions: ProfileMenuAction): MenuProps['items'] => [
    {
        key: 'profile',
        icon: React.createElement(UserOutlined),
        label: 'Mi Perfil',
        onClick: actions.onProfile
    },
    {
        key: 'settings',
        icon: React.createElement(SettingOutlined),
        label: 'Configuración',
        onClick: actions.onSettings
    },
    {
        type: 'divider',
    },
    {
        key: 'logout',
        icon: React.createElement(LogoutOutlined),
        label: 'Cerrar Sesión',
        onClick: actions.onLogout
    },
];
