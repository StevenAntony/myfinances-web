'use client'
import { Avatar, Button, Card, Tag } from "antd";
import { useProfilePageContext } from "../../contexts/ProfileContext";
import FormProfile from "../form-profile";
import { useAuthContext } from "@/src/context/AuthContext";
import avatarUrl from "@/src/utils/shared/urls/avatarUrl";
import Image from "next/image";
import { AVARTAR_DEFAULT } from "@/src/utils/consts/ProfileConst";

export default function HeaderProfile() {
    const { setOpenForm } = useProfilePageContext();
    const { profile } = useAuthContext();

    const handleEdit = () => setOpenForm(true);

    return (
        <div className="mx-auto -mt-12 max-w-6xl px-4 pb-12">
            {/* Encabezado de Perfil */}
            <Card className="overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar 
                                src={avatarUrl(AVARTAR_DEFAULT[profile?.avatar as keyof typeof AVARTAR_DEFAULT])}
                                size={120} 
                            />
                            <div className="space-y-1">
                                <h1 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">{profile?.name}</h1>
                                <p className="text-sm text-muted-foreground">{profile?.email}</p>
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    {/* <Tag color="error">Salud del gasto: {1 < 0.6 ? "Óptima" : 1 < 0.9 ? "Atenta" : "En riesgo"}</Tag> */}
                                    <Tag color="default">Moneda: {'S/'}</Tag>
                                    <Tag color="default">Presupuesto: {profile?.budget}</Tag>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={handleEdit}>
                                Editar perfil
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
            <FormProfile />
        </div>
    );
}