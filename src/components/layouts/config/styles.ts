import type { CSSProperties } from 'react';

export const siderStyle: CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

export const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0
};

export const contentStyle: CSSProperties = {
    padding: 24,
    minHeight: 280,
};

export const toggleButtonStyle: CSSProperties = {
    fontSize: '16px',
    width: 64,
    height: 64,
};
