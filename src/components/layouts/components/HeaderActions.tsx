import { Badge, Button } from 'antd';
import { PlusOutlined, BellOutlined } from '@ant-design/icons';
import ProfileDropdown from './ProfileDropdown';
import type { ProfileMenuAction } from '../config/profileMenuConfig';

interface HeaderActionsProps {
    onNewTransaction: () => void;
    profileActions: ProfileMenuAction;
}

export default function HeaderActions({ onNewTransaction, profileActions }: HeaderActionsProps) {
    return (
        <div className="flex items-center gap-3 md:gap-4">
            {/* Nueva Transacción Button - Hidden on mobile, shown on tablet+ */}
            <Button
                onClick={onNewTransaction} 
                className="!hidden sm:!flex !bg-emerald-500 hover:!bg-emerald-600 !text-white !h-9 !px-4 !rounded-lg !border-0 !shadow-sm hover:!shadow-md transition-all duration-200 items-center gap-2">
                <PlusOutlined className="w-4 h-4" />
                <span className="hidden md:inline">Nueva Transacción</span>
                <span className="md:hidden">Nuevo</span>
            </Button>
            
            {/* Mobile FAB for Nueva Transacción */}
            <Button
                onClick={onNewTransaction}
                className="sm:!hidden !w-10 !h-10 !bg-emerald-500 hover:!bg-emerald-600 !text-white !rounded-full !border-0 !shadow-lg hover:!shadow-xl transition-all duration-200 !p-0 flex items-center justify-center">
                <PlusOutlined className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
                <Badge count={5} size="small" className="[&_.ant-badge-count]:!bg-red-500 [&_.ant-badge-count]:!border-white [&_.ant-badge-count]:!text-xs [&_.ant-badge-count]:!min-w-[18px] [&_.ant-badge-count]:!h-[18px] [&_.ant-badge-count]:!leading-[18px]">
                    <Button 
                        className="!w-10 !h-10 !border-0 !bg-gray-50 hover:!bg-gray-100 !rounded-lg transition-all duration-200 !p-0 flex items-center justify-center">                            
                        <BellOutlined className="text-lg !text-gray-600" />
                    </Button>
                </Badge>
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown actions={profileActions} />
        </div>
    );
}
