import type { InputProps } from 'antd';
import { Input } from 'antd'
import React from 'react'

type Props = {}

export default function InputCustom(props: InputProps) {
    return (
        <div>
            <Input className='!bg-[var(--background)] !text-[var(--foreground)]' {...props}  />
        </div>
    )
}