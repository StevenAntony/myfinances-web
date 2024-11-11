import NavBar from "@/components/nav-bar";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <NavBar />
    );
}
