import { WalletOutlined } from '@ant-design/icons';

interface SidebarHeaderProps {
    collapsed: boolean;
}

export default function SidebarHeader({ collapsed }: SidebarHeaderProps) {
    return (
        <div className="flex items-center justify-center gap-2 p-2 h-[64px]">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <WalletOutlined className="text-xl" style={{ color: "#fff" }} />
            </div>
            {!collapsed && <h1 className="text-xl font-bold text-slate-800">Financia</h1>}
        </div>
    );
}
