import { CategoryCreateApiInterface } from "@/src/core/api/category/category-api";
import CategoryCreateOrUpdateService from "@/src/core/api/category/CategoryCreateOrUpdateService";
import { useState } from "react";

export default function useCreateOrUpdateCategory() {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const createOrUpdateCategory = async (category: CategoryCreateApiInterface, success: (success: boolean) => void, categoryId?: number) => {
        setLoading(true)
        const service = (new CategoryCreateOrUpdateService());
        await service.__invoke(category, categoryId);
        success(service.success);
        setLoading(false);
    }

    return { loading, createOrUpdateCategory }
}