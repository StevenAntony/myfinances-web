'use client'
import { createContext, useContext, useState } from "react";
import { ProfilePageContextProps, ProfiletPageProviderProps } from "./profile-context";
import useUpdateProfile from "../hooks/useUpdateProfile";

const ProfileContext = createContext<ProfilePageContextProps | undefined>(undefined);

export const ProfileProvider = ({ children }: ProfiletPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);

    const { updateProfile, loading, error } = useUpdateProfile();


    const contextValue: ProfilePageContextProps = {
        isOpenForm,
        setOpenForm,
        updateProfile,
        loading,
        error
    };

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfilePageContext = (): ProfilePageContextProps => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfilePageContext must be used within a ProfileProvider');
    }
    return context;
}