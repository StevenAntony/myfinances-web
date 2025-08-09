import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

export const useNavigation = () => {
    const router = useRouter();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        router.push(`/dashboard/${e.key}`);
    };

    const handleProfileClick = () => {
        router.push('/dashboard/profile');
    };

    const handleSettingsClick = () => {
        router.push('/dashboard/settings');
    };

    const handleLogoutClick = () => {
        console.log('Cerrando sesión...');
        // Aquí puedes agregar la lógica de logout
        // router.push('/login');
    };

    return {
        handleMenuClick,
        handleProfileClick,
        handleSettingsClick,
        handleLogoutClick
    };
};
