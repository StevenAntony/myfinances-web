import NavBar from "@/components/common/nav-bar";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}
