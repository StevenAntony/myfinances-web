import { useState } from "react";
import { ProfileCreateOrUpdateApiInterface } from "@/src/core/api/profile/profile-api";
import ProfileCreateOrUpdateService from "@/src/core/api/profile/ProfileCreateOrUpdateService";
import { useAuthContext } from "@/src/context/AuthContext";

export default function useUpdateProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { setProfile } = useAuthContext();

    const updateProfile = async (body: ProfileCreateOrUpdateApiInterface, success: () => void) => {
        setLoading(true);
        try {
            const service = new ProfileCreateOrUpdateService();
            await service.__invoke(body);
            setProfile({
                name: body.name,
                email: body.email,
                avatar: body.avatar,
                budget: body.budget
            });
            success();
        } catch (error) {
            setError('Error al actualizar el perfil');
        }
        setLoading(false);
    };

    return { loading, error, updateProfile };
}
