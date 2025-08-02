import HeaderAccount from "@/src/components/pages/my/accounts/HeaderAccount";
import ListAccount from "@/src/components/pages/my/accounts/ListAccount";

export default function AccountsPage() {
    return (
        <div className="space-y-4">
            <HeaderAccount />
            <ListAccount />
        </div>
    )
}