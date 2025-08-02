import CategoryDeleteService from "@/src/core/api/category/CategoryDeleteService";
import { useState } from "react";

export default function useDeleteCategory() {

    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const deleteCategory = async ( id: number, success: () => void ) => {
        setLoading(true)
        const service = (new CategoryDeleteService());
        await service.__invoke(id);
        success();
        setLoading(false);
    }

    return { loading, deleteCategory }

}