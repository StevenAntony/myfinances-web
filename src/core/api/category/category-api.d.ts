import { ProcessType } from "@/src/utils/consts/ProcessType"

export interface CategoryCreateApiInterface {
    name: string
    type: ProcessType,
    color: string
    icon: string
    budget: number
}

export interface CategoryListApiInterface {
    id: number
    name: string
    type: ProcessType
    color: string
    icon: string
    budget: number
    monthlySpent?: number
}