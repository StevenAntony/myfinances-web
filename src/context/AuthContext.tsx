'use client'
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Session } from "@supabase/supabase-js";
import FullScreenLoading from "../components/loading/FullScreenLoading";
import { useRouter } from 'next/navigation'

type AuthContextType = {
    profile: UserContextInterface | null;
    setProfile: React.Dispatch<React.SetStateAction<UserContextInterface | null>>;
    isAuthenticated: Session | null;
    logout: () => void;
    isLoading: boolean;
}

export interface UserContextInterface {
    name: string;
    email: string;
    avatar: string;
    budget?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<UserContextInterface | null>(null);
    const [isCorrectSession, setIsCorrectSession] = useState<boolean>(false);
    const { session: isAuthenticated, setSession: setIsAuthenticated, isLoading } = useAuth();
    const router = useRouter()

    const logout = () => {
        setIsAuthenticated(null);
    }

    const value: AuthContextType = {
        isAuthenticated,
        logout,
        isLoading,
        setProfile,
        profile,
    }

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
          router.push('/') // redirige al home
        }

        if (!isLoading && isAuthenticated) {
            setIsCorrectSession(true);
            setProfile({
                name: isAuthenticated.user.user_metadata.name || '',
                email: isAuthenticated.user.email || '',
                avatar: isAuthenticated.user.user_metadata.avatar || '',
                budget: isAuthenticated.user.user_metadata.budget || 0
            });
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
