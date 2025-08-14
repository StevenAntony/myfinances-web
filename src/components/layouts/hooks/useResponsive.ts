'use client'
import { useState, useEffect } from 'react';

interface UseResponsiveReturn {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    screenWidth: number;
}

export const useResponsive = (): UseResponsiveReturn => {
    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: screenWidth < 768,
        isTablet: screenWidth >= 768 && screenWidth < 1024,
        isDesktop: screenWidth >= 1024,
        screenWidth,
    };
};
