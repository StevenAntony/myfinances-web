'use client'
import { ProcessType } from "@/src/utils/consts/ProcessType"
import { Input, Radio, Select, Button } from "antd"
import useListAccount from "@/src/components/pages/my/accounts/hooks/useListAccount";
import { useEffect, useState } from "react";
import OptionType from "@/src/components/pages/my/accounts/components/form/OptionType";
import useListCategory from "@/src/components/pages/my/categories/hooks/useListCategory";
import FilterTransactionInterface from "./interfaces/filter-transaction";
import { useTransactionPageContext } from "./contexts/TransactionPageContext";

export default function FilterTransaction() {
    const { accounts, list: listAccount } = useListAccount();
    const { categories, listCategory } = useListCategory();
    const { filter, setFilter, clearFilters } = useTransactionPageContext();

    useEffect(() => {
        listAccount();
        listCategory();
    }, [])
    
    const handleTypeChange = (value: ProcessType) => {
        setFilter({
            ...filter,
            type: value,
            category: null // Reset category when type changes
        });
    };

    const handleSearchChange = (value: string) => {
        setFilter({
            ...filter,
            search: value
        });
    };

    const handleAccountChange = (value: string) => {
        setFilter({
            ...filter,
            account: value
        });
    };

    const handleCategoryChange = (value: string) => {
        setFilter({
            ...filter,
            category: value
        });
    };

    const handleClearFilters = () => {
        clearFilters();
    };
    
    return (
        <div className="card-custom flex gap-4 flex-wrap">
            <div className="w-[191px] max-sm:!w-full">
                <Radio.Group 
                    buttonStyle="solid"
                    value={filter.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                >
                    <Radio.Button value={ProcessType.INCOME}>💰 Ingreso</Radio.Button>
                    <Radio.Button value={ProcessType.EXPENSE}>💸 Gasto  </Radio.Button>
                </Radio.Group>
            </div>
            <div className="flex-1 max-sm:!w-full">
                <Input.Search 
                    placeholder="Buscar..." 
                    value={filter.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    allowClear
                />
            </div>
            <Select
                className="max-sm:!w-full"
                placeholder="Cuenta"
                style={{ width: 300 }}
                value={filter.account}
                onChange={handleAccountChange}
                allowClear
                options={accounts.map(account => {
                    return {
                        label: <OptionType 
                                data={{ label: account.name, color: '', icon: account.type}} 
                                id={account.type} 
                            />,
                        value: account.id.toString(),
                    }
                })}
            />
            <Select
                className="max-sm:!w-full"
                placeholder="Categoría"
                style={{ width: 200 }}
                value={filter.category}
                onChange={handleCategoryChange}
                allowClear
                options={
                    [
                        {
                            label: <span>💰 Ingreso</span>,
                            title: ProcessType.INCOME,
                            options: categories.filter(category => category.type == ProcessType.INCOME).map(category => {
                                return {
                                    label: <div className="space-x-1"><span>{category.icon}</span><span>{category.name}</span></div>,
                                    value: category.id.toString()
                                }
                            })
                        },
                        {
                            label: <span>💸 Gasto</span>,
                            title: ProcessType.EXPENSE,
                            options: categories.filter(category => category.type == ProcessType.EXPENSE).map(category => {
                                return {
                                    label: <div className="space-x-1"><span>{category.icon}</span><span>{category.name}</span></div>,
                                    value: category.id.toString()
                                }
                            })
                        }
                    ]
                }
            />
            <Button 
                className="max-sm:!w-full" 
                onClick={handleClearFilters} 
                type="default"
            >
                Limpiar
            </Button>
        </div>
    )
}