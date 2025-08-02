'use client'
import { Input, Select } from "antd"

export default function FilterTransaction() {
    return (
        <div className="card-custom flex gap-4">
            <Input.Search placeholder="Buscar..." />
            <Select
                defaultValue="Tipo"
                style={{ width: 120 }}
                options={[
                    { value: '0', label: 'Tipo' },
                    { value: 'INCOME', label: 'Ingreso' },
                    { value: 'EXPENSE', label: 'Egreso' },
                ]}
            />
            <Select
                defaultValue="Cuenta"
                style={{ width: 300 }}
                options={[
                    { value: '0', label: 'Cuenta' },
                    { value: 'INCOME', label: 'Ingreso' },
                    { value: 'EXPENSE', label: 'Egreso' },
                ]}
            />
            <Select
                defaultValue="Categoria"
                style={{ width: 350 }}
                options={[
                    { value: '0', label: 'Categoria' },
                    { value: 'INCOME', label: 'Ingreso' },
                    { value: 'EXPENSE', label: 'Egreso' },
                ]}
            />
        </div>
    )
}