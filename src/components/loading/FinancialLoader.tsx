"use client"

import { DollarSign, TrendingUp, BarChart3, PieChart, Calculator, Wallet } from "lucide-react"

interface FinancialLoaderProps {
    message?: string
    size?: "sm" | "md" | "lg"
    variant?: "default" | "minimal" | "detailed"
}

export function FinancialLoader({
    message = "Cargando datos financieros...",
    size = "md",
    variant = "default",
}: FinancialLoaderProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    }

    const containerSizes = {
        sm: "p-4",
        md: "p-8",
        lg: "p-12",
    }

    if (variant === "minimal") {
        return (
            <div className="flex items-center justify-center gap-3 py-4">
                <div className="relative">
                    <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <DollarSign className="w-3 h-3 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="text-sm text-slate-600 font-medium">{message}</span>
            </div>
        )
    }

    if (variant === "detailed") {
        return (
            <div
                className={`flex flex-col items-center justify-center ${containerSizes[size]} bg-slate-50 rounded-lg border border-slate-200`}
            >
                {/* Animated Financial Icons */}
                <div className="relative mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="animate-bounce delay-0">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                        <div className="animate-bounce delay-150">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="animate-bounce delay-300">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
                </div>

                {/* Message */}
                <p className="text-slate-700 font-medium text-center mb-2">{message}</p>
                <p className="text-xs text-slate-500 text-center">Procesando información financiera...</p>

                {/* Animated Numbers */}
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                    <span className="animate-pulse">S/ ***.**</span>
                    <span className="animate-pulse delay-100">S/ ***.**</span>
                    <span className="animate-pulse delay-200">S/ ***.**</span>
                </div>
            </div>
        )
    }

    // Default variant
    return (
        <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
            {/* Main Loader Circle */}
            <div className="relative mb-4">
                <div
                    className={`${sizeClasses[size]} border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Wallet className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"} text-emerald-600`} />
                </div>
            </div>

            {/* Floating Icons */}
            <div className="relative w-24 h-8 mb-4">
                <div className="absolute left-0 top-0 animate-float">
                    <DollarSign className="w-4 h-4 text-emerald-500 opacity-60" />
                </div>
                <div className="absolute right-0 top-0 animate-float-delayed">
                    <Calculator className="w-4 h-4 text-blue-500 opacity-60" />
                </div>
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 animate-float-slow">
                    <PieChart className="w-4 h-4 text-purple-500 opacity-60" />
                </div>
            </div>

            {/* Message */}
            <p className="text-slate-600 font-medium text-center">{message}</p>

            {/* Dots Animation */}
            <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
            </div>
        </div>
    )
}

// Skeleton Loader para listas de transacciones
export function TransactionSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-32"></div>
                            <div className="h-3 bg-slate-200 rounded w-24"></div>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Skeleton Loader para tarjetas de categorías
export function CategorySkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-6 animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-24"></div>
                                <div className="h-3 bg-slate-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-6 bg-slate-200 rounded w-20"></div>
                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Skeleton Loader para dashboard cards
export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-6 animate-pulse">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-4 bg-slate-200 rounded w-24"></div>
                            <div className="w-4 h-4 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <div className="border border-slate-200 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-48 mb-4"></div>
                <div className="h-80 bg-slate-200 rounded"></div>
            </div>
        </div>
    )
}
