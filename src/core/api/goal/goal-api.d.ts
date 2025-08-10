export interface GoalCreateApiInterface {
    name: string;
    description: string;
    icon: string;
    goal_amount: number;
    initial_amount: number;
    date: string;
}

export interface GoalListApiInterface {
    id: number;
    name: string;
    description: string;
    icon: string;
    goalAmount: number;
    initialAmount: number;
    date: string;
    contributions: Array<{ amount: number }>;
    totalContributions: number;
}
