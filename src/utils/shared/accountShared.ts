export const getColorClasses = (color: string, isNegative: boolean = false) => {
    if (isNegative) {
        return {
            bg: "!bg-red-50",
            border: "!border-red-200",
            icon: "!bg-red-600",
            text: "!text-red-800",
        }
    }

    const colorMap: { [key: string]: { bg: string, border: string, text: string, icon: string } } = {
        emerald: {
            bg: "!bg-emerald-50",
            border: "!border-emerald-200",
            icon: "!bg-emerald-600",
            text: "!text-emerald-800",
        },
        blue: {
            bg: "!bg-blue-50",
            border: "!border-blue-200",
            icon: "!bg-blue-600",
            text: "!text-blue-800",
        },
        red: {
            bg: "!bg-red-50",
            border: "!border-red-200",
            icon: "!bg-red-600",
            text: "!text-red-800",
        },
        yellow: {
            bg: "!bg-yellow-50",
            border: "!border-yellow-200",
            icon: "!bg-yellow-600",
            text: "!text-yellow-800",
        },
        purple: {
            bg: "!bg-purple-50",
            border: "!border-purple-200",
            icon: "!bg-purple-600",
            text: "!text-purple-800",
        },
    }
    return colorMap[color] || colorMap.blue
}
