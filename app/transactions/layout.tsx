import SideBar from "@/src/components/layouts/SideBar";

export default function TransactionsLayout ({
    children
} : Readonly<{
  children: React.ReactNode;
}>) {
    return <SideBar>s{children}</SideBar>
}