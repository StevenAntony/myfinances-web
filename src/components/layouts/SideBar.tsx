'use client'
import { SideBarProps } from "./layout";
import { Badge, Button, Layout, Menu } from 'antd';
import {
    AimOutlined,
    BarChartOutlined,
    BellOutlined,
    CalculatorOutlined,
    CreditCardOutlined,
    FileTextOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    PlusOutlined,
    SignatureOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0
}

export default function SideBar(props: SideBarProps) {
    const isMobile = useMediaQuery('(max-width: 639px)');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const router = useRouter();

    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <HomeOutlined /> },
        { key: "transactions", label: "Transacciones", icon: <CreditCardOutlined /> },
        { key: "categories", label: "Categorías", icon: <FileTextOutlined /> },
        { key: "budgets", label: "Presupuestos", icon: <CalculatorOutlined /> },
        { key: "goals", label: "Metas", icon: <AimOutlined /> },
        { key: "reports", label: "Reportes", icon: <BarChartOutlined /> },
        { key: "analytics", label: "Análisis", icon: <PieChartOutlined /> },
        { key: "accounts", label: "Cuentas", icon: <WalletOutlined /> },
        { key: "loans", label: "Préstamos", icon: <SignatureOutlined /> },
    ]

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log("Clickeaste:", e.key);
        router.push(`/dashboard/${e.key}`);
        // Puedes navegar o hacer algo aquí
    };

    useEffect(() => {
        setCollapsed(isMobile ? true : false);
    }, [isMobile])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={siderStyle} className="!bg-[var(--background)] !w-[200px]  max-sm:!min-w-0" trigger={null} collapsible collapsed={collapsed}>
                <div className="flex items-center justify-center gap-2 p-2 h-[64px]">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <WalletOutlined className="text-xl" style={{ color: "#fff" }} />
                    </div>
                    {!collapsed && <h1 className="text-xl font-bold text-slate-800">Financia</h1>}
                </div>
                <div className="demo-logo-vertical" />
                <Menu
                    className="!bg-[var(--background)]"
                    theme="light"
                    mode="inline"
                    onClick={handleClick}
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={headerStyle} className="!bg-[var(--background)] border-b border-slate-200">
                    <div className="flex justify-between w-full">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined className="!text-[var(--foreground)]" /> : <MenuFoldOutlined className="!text-[var(--foreground)]" />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="flex items-center gap-6 px-10 max-sm:flex-[1] max-sm:justify-between">
                            <Button className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !h-10">
                                <PlusOutlined className="w-4 h-4" />
                                Nueva Transacción
                            </Button>
                            <Badge count={5}>
                                <Button className="!p-0 !border-0">                            
                                    <BellOutlined className="text-xl !text-slate-600" />
                                </Button>
                            </Badge>
                        </div>
                    </div>
                </Header>

                <Content
                    className="!bg-slate-50"
                    style={{
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}