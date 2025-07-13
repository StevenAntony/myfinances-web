'use client'
import { SideBarProps } from "./layout";
import { Button, Layout, Menu, theme } from 'antd';
import {
    DiffOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SyncOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function SideBar(props: SideBarProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="!bg-[var(--background)]" trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    className="!bg-[var(--background)] h-full"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <HomeOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'transaction',
                            icon: <SyncOutlined />,
                            label: 'Transacciones',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} className="!bg-[var(--background)]">
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
                </Header>

                <Content
                    className="!bg-[var(--background)]/99"
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