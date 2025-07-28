import CardCategory from "./components/card-category"
import { categoriesDraft } from "./draft/categoriesDraft"


const expenseCategories = categoriesDraft.filter((cat) => cat.type === "expense")
const incomeCategories = categoriesDraft.filter((cat) => cat.type === "income")

type Props = {}

export default function ListCategories({ }: Props) {
    return (
        <div className="space-y-6">
            {/* Expense Categories */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Categorías de Gastos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expenseCategories.map((category) => <CardCategory category={category} key={category.id} />)}
                </div>
            </div>

            {/* Income Categories */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Categorías de Ingresos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {incomeCategories.map((category) => <CardCategory category={category} key={category.id} />)}
                </div>
            </div>
        </div>
    )
}