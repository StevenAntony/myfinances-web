'use client';

import React from 'react';
import { Card, Typography, Timeline, Tag, Divider, Row, Col, Badge } from 'antd';
import { 
  CheckCircleOutlined, 
  MobileOutlined, 
  DashboardOutlined,
  TransactionOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
  BankOutlined,
  TagsOutlined,
  FileTextOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'planned';
}

interface Version {
  version: string;
  releaseDate: string;
  features: Feature[];
  improvements: string[];
  technicalDetails: string[];
}

const DocumentationPage: React.FC = () => {
  const versions: Version[] = [
    {
      version: "1.0.0",
      releaseDate: "Diciembre 2024",
      features: [
        {
          title: "Dashboard Principal",
          description: "Panel de control con resumen financiero, gráficos y métricas clave",
          icon: <DashboardOutlined />,
          status: 'completed'
        },
        {
          title: "Gestión de Transacciones",
          description: "Crear, editar, eliminar y categorizar transacciones de ingresos y gastos",
          icon: <TransactionOutlined />,
          status: 'completed'
        },
        {
          title: "Cuentas Bancarias",
          description: "Administrar múltiples cuentas bancarias y sus saldos",
          icon: <BankOutlined />,
          status: 'completed'
        },
        {
          title: "Categorías Personalizadas",
          description: "Crear y gestionar categorías con iconos emoji personalizados",
          icon: <TagsOutlined />,
          status: 'completed'
        },
        {
          title: "Presupuestos",
          description: "Establecer y monitorear presupuestos por categoría",
          icon: <PieChartOutlined />,
          status: 'completed'
        },
        {
          title: "Metas Financieras",
          description: "Definir objetivos de ahorro y seguir el progreso",
          icon: <PieChartOutlined />,
          status: 'completed'
        },
        {
          title: "Análisis y Reportes",
          description: "Visualización de datos con gráficos y reportes detallados",
          icon: <FileTextOutlined />,
          status: 'completed'
        },
        {
          title: "Gestión de Préstamos",
          description: "Seguimiento de préstamos, pagos y amortizaciones",
          icon: <CreditCardOutlined />,
          status: 'completed'
        },
        {
          title: "Perfil de Usuario",
          description: "Configuración de perfil y preferencias personales",
          icon: <UserOutlined />,
          status: 'completed'
        },
        {
          title: "Aplicación Web Progresiva (PWA)",
          description: "Instalable en dispositivos móviles y de escritorio con funcionalidad offline",
          icon: <MobileOutlined />,
          status: 'completed'
        }
      ],
      improvements: [
        "Interfaz moderna y responsiva con Ant Design",
        "Navegación intuitiva con sidebar colapsible",
        "Autenticación segura con Supabase",
        "Almacenamiento en la nube",
        "Soporte para modo offline",
        "Optimización para dispositivos móviles"
      ],
      technicalDetails: [
        "Next.js 15.3.3 con App Router",
        "React 19 con TypeScript",
        "Ant Design para componentes UI",
        "Supabase para backend y autenticación",
        "Tailwind CSS para estilos",
        "PWA con service workers",
        "Arquitectura modular y escalable"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      case 'planned': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'planned': return 'Planificado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <Title level={1} className="text-center mb-2">
          📚 Documentación de MyFinances
        </Title>
        <Paragraph className="text-center text-lg text-gray-600">
          Registro completo de funcionalidades y mejoras por versión
        </Paragraph>
      </div>

      {versions.map((version, index) => (
        <Card key={version.version} className="mb-8 shadow-lg">
          <div className="mb-6">
            <Badge.Ribbon text={`Versión ${version.version}`} color="blue">
              <Title level={2} className="mb-2">
                🚀 Release {version.version}
              </Title>
            </Badge.Ribbon>
            <Text type="secondary" className="text-lg">
              Fecha de lanzamiento: {version.releaseDate}
            </Text>
          </div>

          <Divider orientation="left">
            <Title level={3}>✨ Funcionalidades Principales</Title>
          </Divider>

          <Row gutter={[16, 16]} className="mb-6">
            {version.features.map((feature, featureIndex) => (
              <Col xs={24} sm={12} lg={8} key={featureIndex}>
                <Card 
                  size="small" 
                  className="h-full hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl text-blue-500 mt-1">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Text strong className="text-base">
                          {feature.title}
                        </Text>
                        <Tag color={getStatusColor(feature.status)}>
                          {getStatusText(feature.status)}
                        </Tag>
                      </div>
                      <Paragraph className="text-sm text-gray-600 mb-0">
                        {feature.description}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <Divider orientation="left">
                <Title level={4}>🔧 Mejoras de UX/UI</Title>
              </Divider>
              <Timeline
                items={version.improvements.map((improvement, idx) => ({
                  dot: <CheckCircleOutlined className="text-green-500" />,
                  children: <Text>{improvement}</Text>
                }))}
              />
            </Col>

            <Col xs={24} lg={12}>
              <Divider orientation="left">
                <Title level={4}>⚙️ Detalles Técnicos</Title>
              </Divider>
              <Timeline
                items={version.technicalDetails.map((detail, idx) => ({
                  dot: <SettingOutlined className="text-blue-500" />,
                  children: <Text>{detail}</Text>
                }))}
              />
            </Col>
          </Row>
        </Card>
      ))}

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Title level={3} className="text-center mb-4">
          🎯 Próximas Versiones
        </Title>
        <Paragraph className="text-center text-gray-600">
          Estamos trabajando constantemente en nuevas funcionalidades y mejoras. 
          Esta documentación se actualizará con cada nueva versión para mantener 
          un registro completo del progreso del proyecto.
        </Paragraph>
        <div className="text-center mt-4">
          <Tag color="orange" className="text-base px-4 py-2">
            Versión 1.1.0 - En Desarrollo
          </Tag>
        </div>
      </Card>
    </div>
  );
};

export default DocumentationPage;
