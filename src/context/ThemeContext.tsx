'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemThemePreference = (): boolean => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Por defecto, si no se puede detectar (ej. SSR), asumimos modo claro
};

interface ThemeProviderProps {
  children: ReactNode; // ReactNode es el tipo para cualquier hijo de React
}

// 4. Crea el Provider con tipado
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Estado para controlar si el tema es oscuro
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Asegúrate de que este código solo se ejecute en el cliente (navegador)
    // Next.js (SSR) no tendrá 'localStorage' disponible en el servidor
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      // Intenta parsear el JSON, si falla, usa la preferencia del sistema
      try {
        return storedTheme ? JSON.parse(storedTheme) : getSystemThemePreference();
      } catch (error) {
        console.error("Error parsing stored theme from localStorage:", error);
        return getSystemThemePreference();
      }
    }
    return getSystemThemePreference(); // Fallback para SSR o si window no está definido
  });

  // Estado para el algoritmo de Ant Design (necesario para manejar la hidratación en algunos casos)
  const [currentAlgorithm, setCurrentAlgorithm] = useState<any>(null);

  console.log(theme.defaultAlgorithm);
  

  // Efecto para escuchar cambios en la preferencia del sistema
  // y para guardar la preferencia en localStorage
  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window === 'undefined') return;

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem('theme'); // Corrección: era localStorage.FgetItem
      if (!storedTheme) { // Si no hay una preferencia guardada, sigue al sistema
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    // Guardar la preferencia actual en localStorage
    localStorage.setItem('theme', JSON.stringify(isDarkMode));

    // Actualizar el algoritmo de Ant Design basado en isDarkMode
    // setCurrentAlgorithm(isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm);

    // Limpiar el event listener al desmontar el componente
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isDarkMode]); // Dependencia en isDarkMode para guardar el cambio y actualizar algoritmo

  // Función para alternar el tema manualmente
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Valor que se proveerá a los consumidores del contexto
  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm, // Usa el algoritmo del estado
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// 5. Crea un Hook personalizado para consumir el Contexto fácilmente con tipado
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};