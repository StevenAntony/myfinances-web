'use client'
import { ProcessType } from "@/src/utils/consts/ProcessType";
import CardCategory from "./components/card-category"
import { useCategoriesPageContext } from "./contexts/CategoriesPageContext"
import { categoriesDraft } from "./draft/categoriesDraft"
import PulseLoading from "@/src/components/loading/PulseLoading";
import EmptyCategory from "./components/empty-category";

type Props = {}

export default function ListCategories({ }: Props) {
    const {
        categories,
        loadingListCategory,
        deleteCategory,
        listCategory,
        loadingDeleteCategory,
    } = useCategoriesPageContext();

    const filterCategory = (type: ProcessType) => {
        return categories.filter((cat) => cat.type === type)
    }

    const deleteCategoryInList = (id: number) => {
        deleteCategory(id, () => {
            listCategory();
        })
    }

    return (
        <div className="space-y-6">
            <PulseLoading isLoading={loadingListCategory}>
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
                                                deleteCategory={deleteCategoryInList}
                                                loadingDeleteCategory={loadingDeleteCategory}
                                                key={category.id}
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
                                                deleteCategory={deleteCategoryInList}
                                                loadingDeleteCategory={loadingDeleteCategory}
                                                key={category.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )
                }
            </PulseLoading>
        </div>
    )
}