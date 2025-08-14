import { WalletOutlined } from '@ant-design/icons';

interface SidebarHeaderProps {
    collapsed: boolean;
}

export default function SidebarHeader({ collapsed }: SidebarHeaderProps) {
    return (
        <div className="flex items-center gap-3 px-6 py-4 h-[72px] border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <WalletOutlined className="text-lg text-white" />
            </div>
            {!collapsed && (
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-900 leading-tight">MyFinances</h1>
                    <span className="text-xs text-gray-500 font-medium">Personal Finance</span>
                </div>
            )}
        </div>
    );
}
