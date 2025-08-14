import type { CSSProperties } from 'react';

export const siderStyle: CSSProperties = {
  overflow: 'hidden',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  borderRight: '1px solid rgba(0, 0, 0, 0.06)',
  background: '#ffffff',
  boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
  transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
};

export const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    height: '64px',
    background: '#ffffff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.02)',
};

export const contentStyle: CSSProperties = {
    padding: '24px',
    minHeight: 'calc(100vh - 64px)',
    background: '#fafafa',
    transition: 'all 0.2s ease-in-out',
};

export const toggleButtonStyle: CSSProperties = {
    fontSize: '16px',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
};

// Responsive breakpoints
export const mobileBreakpoint = '768px';
export const tabletBreakpoint = '1024px';

// Mobile-specific styles
export const mobileSiderStyle: CSSProperties = {
  ...siderStyle,
  position: 'fixed',
  zIndex: 1000,
  left: 0,
  top: 0,
  transform: 'translateX(-100%)',
  transition: 'transform 0.3s ease-in-out',
};

export const mobileOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  zIndex: 999,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease-in-out',
};
