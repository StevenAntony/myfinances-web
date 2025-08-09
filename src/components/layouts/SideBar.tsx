'use client'
import { SideBarProps } from "./layout";
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from "react";
import FormTransaction from "@/src/components/pages/my/transaction/FormTransaction";

// Hooks
import { useSidebarState } from './hooks/useSidebarState';
import { useNavigation } from './hooks/useNavigation';

// Components
import SidebarHeader from './components/SidebarHeader';
import SidebarMenu from './components/SidebarMenu';
import HeaderActions from './components/HeaderActions';

// Styles
import { siderStyle, headerStyle, contentStyle, toggleButtonStyle } from './config/styles';

const { Header, Sider, Content } = Layout;

export default function SideBar(props: SideBarProps) {
    // Para abrir el formulario de creación de una transacción
    const [isOpenFormTransaction, setOpenFormTransaction] = useState<boolean>(false);

    // Custom hooks
    const { collapsed, toggleCollapsed } = useSidebarState();
    const { 
        handleMenuClick, 
        handleProfileClick, 
        handleSettingsClick, 
        handleLogoutClick 
    } = useNavigation();

    // Profile actions
    const profileActions = {
        onProfile: handleProfileClick,
        onSettings: handleSettingsClick,
        onLogout: handleLogoutClick
    };

    const handleNewTransaction = () => {
        setOpenFormTransaction(true);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                style={siderStyle} 
                className="!bg-[var(--background)] !w-[200px] max-sm:!min-w-0" 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
            >
                <SidebarHeader collapsed={collapsed} />
                <div className="demo-logo-vertical" />
                <SidebarMenu onClick={handleMenuClick} />
            </Sider>
            
            <Layout>
                <Header style={headerStyle} className="!bg-[var(--background)] border-b border-slate-200">
                    <div className="flex justify-between w-full">
                        <Button
                            type="text"
                            icon={collapsed ? 
                                <MenuUnfoldOutlined className="!text-[var(--foreground)]" /> : 
                                <MenuFoldOutlined className="!text-[var(--foreground)]" />
                            }
                            onClick={toggleCollapsed}
                            style={toggleButtonStyle}
                        />
                        <HeaderActions 
                            onNewTransaction={handleNewTransaction}
                            profileActions={profileActions}
                        />
                    </div>
                </Header>

                <Content className="!bg-slate-50" style={contentStyle}>
                    {props.children}
                </Content>
                
                <FormTransaction 
                    isOpen={isOpenFormTransaction}
                    setOpen={setOpenFormTransaction}
                />
            </Layout>
        </Layout>
    )
}