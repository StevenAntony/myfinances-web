'use client'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

type Props = {
    title: string
    description: string
    titleButton: string
}

export default function TitlePage({ title, description, titleButton }: Props) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{ title }</h1>
                <p className="text-slate-600"> { description } </p>
            </div>

            <Button onClick={() => {}} className="!bg-emerald-600 !hover:bg-emerald-700 !h-10 !text-white">
                <PlusOutlined className="w-4 h-4" />
                { titleButton }
            </Button>
        </div>
    )
}