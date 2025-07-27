import TitlePage from "@/src/components/customs/title-page";
import ListCategories from "@/src/pages/app/categories/ListCategories";

export default function CategoriesPage() {
    return (
        <div className="space-y-4">
            <TitlePage 
                title="Categorías" 
                description="Organiza tus ingresos y gastos por categorías" 
                titleButton="Nueva Categoría"
            />
            <ListCategories />
        </div>
    )
}