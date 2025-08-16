'use client'
import { ProcessType } from "@/src/utils/consts/ProcessType";
import CardCategory from "./components/card-category"
import { useCategoriesPageContext } from "./contexts/CategoriesPageContext"
import EmptyCategory from "./components/empty-category";
import { FinancialLoader } from "@/src/components/loading/FinancialLoader";

export default function ListCategories() {
    const {
        categories,
        loadingListCategory,
        loadingDeleteCategory,
        actionsMenu,
        setSelectedCategory,
    } = useCategoriesPageContext();

    const filterCategory = (type: ProcessType) => {
        return categories.filter((cat) => cat.type === type)
    }

    if (loadingListCategory) {
        return (
          <div className="space-y-6">
            <div className="text-center py-4">
              <FinancialLoader message="Cargando categorias..." size="md" />
            </div>
          </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                {
                    categories.length === 0
                        ? <EmptyCategory />
                        : (
                            <>
                                {/* Expense Categories */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Categorías de Gastos</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filterCategory(ProcessType.EXPENSE).map((category) => (
                                            <CardCategory
                                                category={category}
                                                loadingDeleteCategory={loadingDeleteCategory}
                                                key={category.id}
                                                actionsMenu={actionsMenu}
                                                setSelectedCategory={setSelectedCategory}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Income Categories */}
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Categorías de Ingresos</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filterCategory(ProcessType.INCOME).map((category) => (
                                            <CardCategory
                                                category={category}
                                                loadingDeleteCategory={loadingDeleteCategory}
                                                actionsMenu={actionsMenu}
                                                setSelectedCategory={setSelectedCategory}
                                                key={category.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}