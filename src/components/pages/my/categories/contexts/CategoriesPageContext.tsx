'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { CategoriesPageContextType, CategoriesPageProviderProps } from "./categories-page";
import useCreateOrUpdateCategory from "../hooks/useCreateOrUpdateCategory";
import useListCategory from "../hooks/useListCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { Modal, type MenuProps } from "antd";
import CardCategoryInterface from "../interfaces/card-category";

const CategoriesPageContext = createContext<CategoriesPageContextType | undefined>(undefined);

export const CategoriesPageProvider = ({ children }: CategoriesPageProviderProps) => {
    const [modal, contextHolder] = Modal.useModal();

    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { createOrUpdateCategory, loading: loadingSaveCategory } = useCreateOrUpdateCategory();
    const { categories, loading: loadingListCategory, listCategory } = useListCategory();
    const { deleteCategory, loading: loadingDeleteCategory } = useDeleteCategory();

    const [ selectedCategory, setSelectedCategory ] = useState<CardCategoryInterface | null>(null);

    const actionsMenu: MenuProps['items'] = [
        {
            key: "edit",
            label: "Editar",
            onClick: () => {
                if (selectedCategory) {
                    setOpenForm(true);
                }
            }
        },
        {
            key: "delete",
            label: "Eliminar",
            danger: true,
            onClick: async () => {
                if (selectedCategory) {
                    await modal.confirm({
                        title: '¿Estás seguro de eliminar esta categoria?',
                        content: `Se eliminará permanentemente la categoria "${selectedCategory.name}". Esta acción no se puede deshacer.`,
                        okText: 'Eliminar',
                        cancelText: 'Cancelar',
                        okType: 'danger',
                        onOk: () => {
                            deleteCategory(selectedCategory.id as number, () => {
                                listCategory();
                            })
                        }
                    });
                }
            }
        }
    ]

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: CategoriesPageContextType = {
        isOpenForm,
        closeForm,
        openForm,

        createOrUpdateCategory,
        loadingSaveCategory,

        categories, 
        loadingListCategory,
        listCategory,

        deleteCategory,
        loadingDeleteCategory,

        selectedCategory,
        setSelectedCategory,

        actionsMenu,
    };

    useEffect(() => {
        listCategory();
    }, [])

    return (
        <CategoriesPageContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </CategoriesPageContext.Provider>
    );
}

export const useCategoriesPageContext = (): CategoriesPageContextType => {
    const context = useContext(CategoriesPageContext);
    if (context === undefined) {
        throw new Error('useCategoriesPageContext must be used within a CategoriesPageProvider');
    }
    return context;
};