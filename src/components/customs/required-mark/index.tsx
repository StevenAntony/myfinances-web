import { Tag } from "antd";

export default function CustomizeRequiredMark(label: React.ReactNode, { required }: { required: boolean }) {
    return (
        <>
            {required ? <Tag color="error">obligatorio</Tag> : <Tag color="warning">opcional</Tag>}
            {label}
        </>
    )
}