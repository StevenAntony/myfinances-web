import { ProfileCreateOrUpdateApiInterface } from "@/src/core/api/profile/profile-api";

export type ProfilePageContextProps = {
    isOpenForm: boolean;
    setOpenForm: (isOpen: boolean) => void;
    updateProfile: (body: ProfileCreateOrUpdateApiInterface, success: () => void) => void;
    loading: boolean;
    error: string | null;
}

export type ProfiletPageProviderProps = {
    children: React.ReactNode;
}
