import HeaderCategory from "@/src/components/pages/my/categories/HeaderCategory";
import ListCategories from "@/src/components/pages/my/categories/ListCategories";
import { CategoriesPageProvider } from "@/src/components/pages/my/categories/contexts/CategoriesPageContext";

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