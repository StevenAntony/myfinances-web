'use client'
import TitlePage from "@/src/components/customs/title-page"
import { useCategoriesPageContext } from "./contexts/CategoriesPageContext"
import FormCategory from "./FormCategory";

export default function HeaderCategory() {
    const { openForm, setSelectedCategory } = useCategoriesPageContext();
    return (
        <div>
            <TitlePage
                title="Categorías"
                description="Organiza tus ingresos y gastos por categorías"
                titleButton="Nueva Categoría"
                handleButton={() => {
                    setSelectedCategory(null);
                    openForm();
                }}
            />
            <FormCategory />
        </div>
    )
}