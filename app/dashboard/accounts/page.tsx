import HeaderAccount from "@/src/pages/app/accounts/HeaderAccount";
import ListAccount from "@/src/pages/app/accounts/ListAccount";

export default function AccountsPage() {
    return (
        <div className="space-y-4">
            <HeaderAccount />
            <ListAccount />
        </div>
    )
}