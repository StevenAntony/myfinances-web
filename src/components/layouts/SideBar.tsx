'use client'
import { SideBarProps } from "./layout";
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import FormTransaction from "@/src/components/pages/my/transaction/FormTransaction";

// Hooks
import { useSidebarState } from './hooks/useSidebarState';
import { useNavigation } from './hooks/useNavigation';
import { useResponsive } from './hooks/useResponsive';

// Components
import SidebarHeader from './components/SidebarHeader';
import SidebarMenu from './components/SidebarMenu';
import HeaderActions from './components/HeaderActions';

// Styles
import { 
    siderStyle, 
    headerStyle, 
    contentStyle, 
    toggleButtonStyle,
    mobileSiderStyle,
    mobileOverlayStyle 
} from './config/styles';

const { Header, Sider, Content } = Layout;

export default function SideBar(props: SideBarProps) {
    // Para abrir el formulario de creación de una transacción
    const [isOpenFormTransaction, setOpenFormTransaction] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Custom hooks
    const { collapsed, toggleCollapsed } = useSidebarState();
    const { isMobile, isTablet } = useResponsive();
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

    const handleToggleMobile = () => {
        if (isMobile) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            toggleCollapsed();
        }
    };

    const handleOverlayClick = () => {
        setMobileMenuOpen(false);
    };

    // Close mobile menu when screen size changes
    useEffect(() => {
        if (!isMobile && mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    }, [isMobile, mobileMenuOpen]);

    // Determine sidebar styles based on screen size
    const getSiderStyle = () => {
        if (isMobile) {
            return {
                ...mobileSiderStyle,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            };
        }
        return siderStyle;
    };

    const getOverlayStyle = () => {
        if (isMobile && mobileMenuOpen) {
            return {
                ...mobileOverlayStyle,
                opacity: 1,
                visibility: 'visible' as const,
            };
        }
        return mobileOverlayStyle;
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Mobile Overlay */}
            {isMobile && (
                <div 
                    style={getOverlayStyle()}
                    onClick={handleOverlayClick}
                />
            )}

            <Sider 
                style={getSiderStyle()}
                className="!bg-white"
                trigger={null} 
                collapsible 
                collapsed={isMobile ? false : collapsed}
                width={isMobile ? 280 : 240}
                collapsedWidth={isMobile ? 280 : 80}
            >
                <div className="h-full flex flex-col overflow-hidden">
                    <SidebarHeader collapsed={isMobile ? false : collapsed} />
                    <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
                        <SidebarMenu onClick={handleMenuClick} />
                    </div>
                </div>
            </Sider>
            
            <Layout className="transition-all duration-200">
                <Header style={headerStyle} className="!bg-white">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-4">
                            <Button
                                type="text"
                                icon={
                                    isMobile ? (
                                        <MenuUnfoldOutlined className="!text-gray-600" />
                                    ) : collapsed ? (
                                        <MenuUnfoldOutlined className="!text-gray-600" /> 
                                    ) : (
                                        <MenuFoldOutlined className="!text-gray-600" />
                                    )
                                }
                                onClick={handleToggleMobile}
                                style={toggleButtonStyle}
                                className="hover:!bg-gray-100"
                            />
                            {/* Breadcrumb or page title could go here */}
                        </div>
                        
                        <HeaderActions 
                            onNewTransaction={handleNewTransaction}
                            profileActions={profileActions}
                        />
                    </div>
                </Header>

                <Content style={contentStyle}>
                    <div className="h-full">
                        {props.children}
                    </div>
                </Content>
                
                <FormTransaction 
                    isOpen={isOpenFormTransaction}
                    setOpen={setOpenFormTransaction}
                />
            </Layout>
        </Layout>
    )
}