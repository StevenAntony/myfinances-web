import CoverProfile from "@/src/components/pages/my/profile/my/components/cover-profile";
import HeaderProfile from "@/src/components/pages/my/profile/my/components/header-profile";
import { ProfileProvider } from "@/src/components/pages/my/profile/my/contexts/ProfileContext";

export default function ProfilePage() {
    return (
        <ProfileProvider>
            <CoverProfile />
            <HeaderProfile />
        </ProfileProvider>
    )
}