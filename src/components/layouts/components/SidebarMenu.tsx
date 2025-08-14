import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { getMenuItems } from '../config/menuConfig';

interface SidebarMenuProps {
    onClick: MenuProps['onClick'];
}

export default function SidebarMenu({ onClick }: SidebarMenuProps) {
    return (
        <Menu
            className="!bg-transparent !border-0 [&_.ant-menu-item]:!mx-2 [&_.ant-menu-item]:!rounded-lg [&_.ant-menu-item]:!mb-1 [&_.ant-menu-item]:!h-10 [&_.ant-menu-item]:!leading-10 [&_.ant-menu-item]:!px-3 [&_.ant-menu-item-selected]:!bg-emerald-50 [&_.ant-menu-item-selected]:!text-emerald-600 [&_.ant-menu-item]:!text-gray-600 [&_.ant-menu-item]:hover:!bg-gray-50 [&_.ant-menu-item]:hover:!text-gray-900 [&_.ant-menu-item]:!transition-all [&_.ant-menu-item]:!duration-200 [&_.ant-menu-item-icon]:!text-base [&_.ant-menu-item-selected_.ant-menu-item-icon]:!text-emerald-600"
            theme="light"
            mode="inline"
            onClick={onClick}
            defaultSelectedKeys={['1']}
            items={getMenuItems()}
        />
    );
}
