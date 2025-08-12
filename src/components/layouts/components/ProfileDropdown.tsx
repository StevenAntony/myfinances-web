import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getProfileMenuItems, type ProfileMenuAction } from '../config/profileMenuConfig';
import { useAuthContext } from '@/src/context/AuthContext';
import { AVARTAR_DEFAULT } from '@/src/utils/consts/ProfileConst';
import avatarUrl from '@/src/utils/shared/urls/avatarUrl';

interface ProfileDropdownProps {
    actions: ProfileMenuAction;
}

export default function ProfileDropdown({ actions }: ProfileDropdownProps) {
    const { profile } = useAuthContext();

    return (
        <Dropdown
            menu={{ items: getProfileMenuItems(actions) }}
            placement="bottomRight"
            arrow
        >
            <Avatar 
                size="large" 
                src={avatarUrl(AVARTAR_DEFAULT[profile?.avatar as keyof typeof AVARTAR_DEFAULT])}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            />
        </Dropdown>
    );
}
