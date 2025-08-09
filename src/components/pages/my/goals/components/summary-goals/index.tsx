import { Card } from "antd";

export default function SummaryGoals() {
    const goals = [
        {
          id: 1,
          title: "Fondo de Emergencia",
          description: "6 meses de gastos básicos",
          targetAmount: 30000,
          currentAmount: 18500,
          deadline: "2024-12-31",
          category: "emergency",
          icon: "🚨",
        },
        {
          id: 2,
          title: "Vacaciones en Europa",
          description: "Viaje de 2 semanas",
          targetAmount: 8000,
          currentAmount: 3200,
          deadline: "2024-07-15",
          category: "travel",
          icon: "✈️",
        },
        {
          id: 3,
          title: "Nuevo Automóvil",
          description: "Enganche para auto nuevo",
          targetAmount: 15000,
          currentAmount: 7500,
          deadline: "2024-10-01",
          category: "vehicle",
          icon: "🚗",
        },
        {
          id: 4,
          title: "Curso de Programación",
          description: "Bootcamp de desarrollo web",
          targetAmount: 2500,
          currentAmount: 2500,
          deadline: "2024-03-01",
          category: "education",
          icon: "💻",
        },
    ]

    const totalGoalsAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
    const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
    const completedGoals = goals.filter((goal) => goal.currentAmount >= goal.targetAmount).length

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Total de Metas</div>
            {/* <Target className="h-4 w-4 text-slate-400" /> */}
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{goals.length}</div>
            <p className="text-xs text-slate-500 mt-1">Metas activas</p>
          </div>
        </Card>

        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Metas Completadas</div>
            {/* <TrendingUp className="h-4 w-4 text-emerald-500" /> */}
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">{completedGoals}</div>
            <p className="text-xs text-slate-500 mt-1">
              {((completedGoals / goals.length) * 100).toFixed(0)}% completado
            </p>
          </div>
        </Card>

        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Total Ahorrado</div>
            {/* <DollarSign className="h-4 w-4 text-blue-500" /> */}
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">${totalSavedAmount.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {((totalSavedAmount / totalGoalsAmount) * 100).toFixed(1)}% del objetivo total
            </p>
          </div>
        </Card>

        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Meta Total</div>
            {/* <Target className="h-4 w-4 text-purple-500" /> */}
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">${totalGoalsAmount.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">Objetivo combinado</p>
          </div>
        </Card>
      </div>
    );
}