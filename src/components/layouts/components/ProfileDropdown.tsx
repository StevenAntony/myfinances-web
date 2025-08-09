import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getProfileMenuItems, type ProfileMenuAction } from '../config/profileMenuConfig';

interface ProfileDropdownProps {
    actions: ProfileMenuAction;
}

export default function ProfileDropdown({ actions }: ProfileDropdownProps) {
    return (
        <Dropdown
            menu={{ items: getProfileMenuItems(actions) }}
            placement="bottomRight"
            arrow
        >
            <Avatar 
                size="large" 
                icon={<UserOutlined />}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#10b981' }}
            />
        </Dropdown>
    );
}
