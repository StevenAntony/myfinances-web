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
        <div className="flex items-center gap-6 px-10 max-sm:flex-[1] max-sm:justify-between">
            <Button
                onClick={onNewTransaction} 
                className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !h-10">
                <PlusOutlined className="w-4 h-4" />
                Nueva Transacción
            </Button>
            <Badge count={5}>
                <Button className="!p-0 !border-0">                            
                    <BellOutlined className="text-xl !text-slate-600" />
                </Button>
            </Badge>
            <ProfileDropdown actions={profileActions} />
        </div>
    );
}
