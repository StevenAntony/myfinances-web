'use client'
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import FullScreenLoading from "../components/loading/FullScreenLoading";
import { useRouter } from 'next/navigation'

type AuthContextType = {
    isAuthenticated: Session | null;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCorrectSession, setIsCorrectSession] = useState<boolean>(false);
    const { session: isAuthenticated, setSession: setIsAuthenticated, isLoading } = useAuth();
    const router = useRouter()

    const logout = () => {
        setIsAuthenticated(null);
    }

    const value = {
        isAuthenticated,
        logout,
        isLoading,
    }

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
          router.push('/') // redirige al home
        }

        if (!isLoading && isAuthenticated) {
            setIsCorrectSession(true);
        }
      }, [isLoading, isAuthenticated, router])

    return (
        <AuthContext.Provider value={value}>
            {
                isLoading || !isCorrectSession ? (
                    <FullScreenLoading />
                ) : (
                    <>{children}</>
                )
            }
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
