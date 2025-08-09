import { Card, Tag } from "antd"

export default function ListGoals() {

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

    const getStatusBadge = (goal: any) => {
        const percentage = (goal.currentAmount / goal.targetAmount) * 100
        const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        )

        if (percentage >= 100) {
            return <Tag color="success">Completado</Tag>
        } else if (daysUntilDeadline < 0) {
            return <Tag color="error">Vencido</Tag>
        } else if (daysUntilDeadline < 30) {
            return <Tag color="warning">Próximo a vencer</Tag>
        } else {
            return <Tag color="blue">En progreso</Tag>
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
                const percentage = (goal.currentAmount / goal.targetAmount) * 100
                const remaining = goal.targetAmount - goal.currentAmount
                const daysUntilDeadline = Math.ceil(
                    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )
                const isCompleted = percentage >= 100

                return (
                    <Card key={goal.id} className="border-slate-200">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{goal.icon}</span>
                                    <div>
                                        <div className="text-lg text-slate-900">{goal.title}</div>
                                        <div>{goal.description}</div>
                                    </div>
                                </div>
                                {getStatusBadge(goal)}
                            </div>
                        </div>
                        <div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-slate-500">Ahorrado</p>
                                        <p className={`text-2xl font-bold ${isCompleted ? "text-emerald-600" : "text-slate-900"}`}>
                                            ${goal.currentAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Meta</p>
                                        <p className="text-lg font-semibold text-slate-700">${goal.targetAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                        <span>{percentage.toFixed(1)}% completado</span>
                                        <span>{isCompleted ? "¡Meta alcanzada!" : `$${remaining.toFixed(2)} restante`}</span>
                                    </div>
                                    {/* <Progress value={Math.min(percentage, 100)} className="h-3" /> */}
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-slate-500">
                                        {/* <Calendar className="w-3 h-3" /> */}
                                        <span>
                                            {daysUntilDeadline > 0
                                                ? `${daysUntilDeadline} días restantes`
                                                : daysUntilDeadline === 0
                                                    ? "Vence hoy"
                                                    : `Venció hace ${Math.abs(daysUntilDeadline)} días`}
                                        </span>
                                    </div>
                                    <span className="text-slate-600">{new Date(goal.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}