'use client';

import React, { useState } from 'react';
import { Button, Card, Typography, Space } from 'antd';
import { DownloadOutlined, CloseOutlined, MobileOutlined } from '@ant-design/icons';
import { usePWA } from '@/src/hooks/usePWA';

const { Text, Title } = Typography;

const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  // No mostrar si ya está instalado, no es instalable, o fue descartado
  if (isInstalled || !isInstallable || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    await installApp();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        maxWidth: '400px',
        width: '90%',
      }}
    >
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e8e8e8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <MobileOutlined 
            style={{ 
              fontSize: '24px', 
              color: '#1890ff',
              marginTop: '4px'
            }} 
          />
          
          <div style={{ flex: 1 }}>
            <Title level={5} style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
              Instalar Aplicación
            </Title>
            <Text style={{ fontSize: '14px', color: '#666' }}>
              Instala MyFinances en tu dispositivo para un acceso rápido y experiencia nativa.
            </Text>
            
            <Space style={{ marginTop: '12px', width: '100%' }} size="small">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleInstall}
                size="small"
                style={{ borderRadius: '6px' }}
              >
                Instalar
              </Button>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={handleDismiss}
                size="small"
                style={{ color: '#999' }}
              >
                Ahora no
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
