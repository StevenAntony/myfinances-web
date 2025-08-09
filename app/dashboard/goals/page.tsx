import HeaderGoal from "@/src/components/pages/my/goals/components/header-goal";
import ListGoals from "@/src/components/pages/my/goals/components/list-goals";
import SummaryGoals from "@/src/components/pages/my/goals/components/summary-goals";

export default function GoalsPage() {
    return (
        <div className="space-y-4">
            <HeaderGoal />
            <SummaryGoals />
            <ListGoals />
        </div>
    );
}