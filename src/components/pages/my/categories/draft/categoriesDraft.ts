import CardCategoryInterface from "../interfaces/card-category";

export const categoriesDraft: CardCategoryInterface[] = [
    { id: 1, name: "Alimentación", type: "expense", color: "red", icon: "🍽️", monthlySpent: 2450, budget: 3000 },
    { id: 2, name: "Transporte", type: "expense", color: "blue", icon: "🚗", monthlySpent: 1200, budget: 1500 },
    { id: 3, name: "Entretenimiento", type: "expense", color: "yellow", icon: "🎬", monthlySpent: 800, budget: 1000 },
    { id: 4, name: "Servicios", type: "expense", color: "purple", icon: "⚡", monthlySpent: 1500, budget: 1600 },
    { id: 5, name: "Salud", type: "expense", color: "green", icon: "🏥", monthlySpent: 300, budget: 500 },
    { id: 6, name: "Salario", type: "income", color: "emerald", icon: "💼", monthlySpent: 5000, budget: 0 },
    { id: 7, name: "Freelance", type: "income", color: "blue", icon: "💻", monthlySpent: 800, budget: 0 },
    { id: 8, name: "Inversiones", type: "income", color: "purple", icon: "📈", monthlySpent: 150, budget: 0 },
]
