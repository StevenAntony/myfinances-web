import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { getMenuItems } from '../config/menuConfig';

interface SidebarMenuProps {
    onClick: MenuProps['onClick'];
}

export default function SidebarMenu({ onClick }: SidebarMenuProps) {
    return (
        <Menu
            className="!bg-[var(--background)]"
            theme="light"
            mode="inline"
            onClick={onClick}
            defaultSelectedKeys={['1']}
            items={getMenuItems()}
        />
    );
}
