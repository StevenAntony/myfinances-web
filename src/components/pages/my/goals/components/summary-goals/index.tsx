'use client'
import { Card } from "antd";
import { useGoalPageContext } from "../../contexts/GoalPageContext";
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";
import GoalIcon from "@/src/components/icons/dashboard/GoalIcon";
import SavingIcon from "@/src/components/icons/account/SavingIcon";

export default function SummaryGoals() {
    const { goals } = useGoalPageContext();

    const totalGoalsAmount = goals.reduce((sum, goal: GoalListApiInterface) => sum + goal.goalAmount, 0);
    const totalSavedAmount = goals.reduce((sum, goal: GoalListApiInterface) => sum + goal.totalContributions, 0);
    const completedGoals = goals.filter((goal: GoalListApiInterface) => goal.totalContributions >= goal.goalAmount).length

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Total de Metas</div>
            <GoalIcon className="h-4 w-4 text-slate-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{goals.length}</div>
            <p className="text-xs text-slate-500 mt-1">Metas activas</p>
          </div>
        </Card>

        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Metas Completadas</div>
            <GoalIcon className="h-4 w-4 text-emerald-500" />
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
            <SavingIcon className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalSavedAmount)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {((totalSavedAmount / totalGoalsAmount) * 100).toFixed(1)}% del objetivo total
            </p>
          </div>
        </Card>

        <Card className="border-slate-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-600">Meta Total</div>
            <GoalIcon className="h-4 w-4 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalGoalsAmount)}</div>
            <p className="text-xs text-slate-500 mt-1">Objetivo combinado</p>
          </div>
        </Card>
      </div>
    );
}