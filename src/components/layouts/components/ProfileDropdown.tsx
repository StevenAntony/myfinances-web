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
            arrow={{ pointAtCenter: true }}
            overlayClassName="[&_.ant-dropdown-menu]:!rounded-xl [&_.ant-dropdown-menu]:!shadow-lg [&_.ant-dropdown-menu]:!border-0 [&_.ant-dropdown-menu-item]:!rounded-lg [&_.ant-dropdown-menu-item]:!mx-1 [&_.ant-dropdown-menu-item]:!my-1 [&_.ant-dropdown-menu-item]:hover:!bg-gray-50"
        >
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-all duration-200">
                <Avatar 
                    size={40}
                    src={avatarUrl(AVARTAR_DEFAULT[profile?.avatar as keyof typeof AVARTAR_DEFAULT])}
                    className="ring-2 ring-gray-100 hover:ring-gray-200 transition-all duration-200"
                />
                <div className="hidden md:flex flex-col">
                    <span className="text-sm font-medium text-gray-900 leading-tight">
                        {profile?.name || 'Usuario'}
                    </span>
                    <span className="text-xs text-gray-500">
                        {profile?.email || 'usuario@email.com'}
                    </span>
                </div>
            </div>
        </Dropdown>
    );
}
