import { useState, useEffect } from 'react';
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

export const useSidebarState = () => {
    const isMobile = useMediaQuery('(max-width: 639px)');
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        setCollapsed(isMobile ? true : false);
    }, [isMobile]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return {
        collapsed,
        isMobile,
        toggleCollapsed
    };
};
