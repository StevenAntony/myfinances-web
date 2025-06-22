export default function FullScreenLoading() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner principal */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-600/20 dark:border-t-blue-400/20"></div>
                </div>

                {/* Texto de carga */}
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cargando...</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Por favor espera un momento</p>
                </div>

                {/* Barra de progreso animada */}
                <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                </div>

                {/* Puntos animados */}
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                        className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
