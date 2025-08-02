import HeaderCategory from "@/src/pages/app/categories/HeaderCategory";
import ListCategories from "@/src/pages/app/categories/ListCategories";
import { CategoriesPageProvider } from "@/src/pages/app/categories/contexts/CategoriesPageContext";

export default function CategoriesPage() {
    return (
        <CategoriesPageProvider>
            <div className="space-y-4">
                <HeaderCategory />
                <ListCategories />
            </div>
        </CategoriesPageProvider>
    )
}