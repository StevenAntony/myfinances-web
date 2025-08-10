import SideBar from '@/src/components/layouts/SideBar'
import { AppProvider } from '@/src/context/AppContext';
import { AuthProvider } from '@/src/context/AuthContext';

export default function layout({ children } : Readonly<{ children: React.ReactNode; }>) {
  return (
    <AuthProvider>
      <AppProvider>
        <SideBar>{children}</SideBar>
      </AppProvider>
    </AuthProvider>
  )
}