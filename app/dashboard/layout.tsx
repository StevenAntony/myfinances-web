import SideBar from '@/src/components/layouts/SideBar'

export default function layout({ children } : Readonly<{ children: React.ReactNode; }>) {
  return (
    <SideBar>{children}</SideBar>
  )
}