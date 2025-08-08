import SideBar from '@/src/components/layouts/SideBar'
import { AppProvider } from '@/src/context/AppContext';

export default function layout({ children } : Readonly<{ children: React.ReactNode; }>) {
  return (
    <AppProvider>
      <SideBar>{children}</SideBar>
    </AppProvider>
  )
}