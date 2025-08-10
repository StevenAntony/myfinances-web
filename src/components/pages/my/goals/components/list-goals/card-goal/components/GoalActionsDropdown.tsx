import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import { useGoalActions, GoalActionsProps } from "../hooks/useGoalActions";

interface GoalActionsDropdownProps {
    goal: GoalListApiInterface;
    actions: GoalActionsProps;
}

export default function GoalActionsDropdown({ goal, actions }: GoalActionsDropdownProps) {
    const { menuItems } = useGoalActions(goal, actions);

    return (
        <Dropdown 
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={['click']}
        >
            <MoreOutlined className="cursor-pointer p-2 hover:bg-slate-100 rounded" />
        </Dropdown>
    );
}
