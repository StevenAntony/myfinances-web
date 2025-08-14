export default function AccountSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden animate-pulse">
                    {/* Top accent line */}
                    <div className="h-1 bg-slate-200"></div>
                    
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                                <div className="space-y-2">
                                    <div className="h-5 bg-slate-200 rounded w-32"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 bg-slate-200 rounded-full w-16"></div>
                                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 bg-slate-200 rounded"></div>
                        </div>

                        {/* Balance Section */}
                        <div className="mb-6">
                            <div className="h-8 bg-slate-200 rounded w-40 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
                            <div className="h-3 bg-slate-200 rounded w-20"></div>
                        </div>

                        {/* Credit section (for some cards) */}
                        {i % 3 === 0 && (
                            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                <div className="flex justify-between mb-3">
                                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full mb-2"></div>
                                <div className="flex justify-between">
                                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}