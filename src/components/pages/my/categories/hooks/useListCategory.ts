import CategoryListService from "@/src/core/api/category/CategoryListService";
import { useState } from "react";
import CardCategoryInterface from "../interfaces/card-category";

export default function useListCategory() {
    const [categories, setCategories] = useState<CardCategoryInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const listCategory = async () => {
        setLoading(true)
        const service = (new CategoryListService());
        await service.__invoke();
        const transformData = service.data.map(item => {
            return {
                id: item.id,
                budget: item.budget,
                color: item.color,
                icon: item.icon,
                monthlySpent: 0,
                name: item.name,
                type: item.type
            }
        });
        setCategories([...transformData]);
        
        setLoading(false);
    }

    return { loading, listCategory, categories }
}