"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchDoctors, setFilters, clearFilters } from "@/lib/store/slices/doctorSlice"
import { DoctorCard } from "@/components/doctor/doctor-card"
import { DoctorFilter } from "@/components/doctor/doctor-filter"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"
import { Stethoscope, Grid3x3, List, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { DoctorFilters } from "@/lib/types/doctor"

export default function DoctorsPage() {
    const dispatch = useAppDispatch()
    const { doctors, filters, isLoading, error } = useAppSelector((state) => state.doctor)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        dispatch(fetchDoctors(filters))
    }, [dispatch, filters])

    const handleFilterChange = (newFilters: DoctorFilters) => {
        dispatch(setFilters(newFilters))
    }

    const handleClearFilters = () => {
        dispatch(clearFilters())
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Find a Doctor</h1>
                            <p className="text-muted-foreground">
                                Browse our network of qualified medical professionals
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-4">
                            <DoctorFilter
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {isLoading ? "Loading..." : `${doctors.length} Doctors Available`}
                                </h2>
                                {filters.specialty && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Showing {filters.specialty} specialists
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                                <p className="text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} gap-6`}>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-3">
                                        <Skeleton className="h-48 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Doctors Grid/List */}
                        {!isLoading && doctors.length > 0 && (
                            <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} gap-6`}>
                                {doctors.map((doctor, index) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && doctors.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-16"
                            >
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Stethoscope className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your filters to see more results
                                </p>
                                <Button onClick={handleClearFilters} variant="outline">
                                    Clear Filters
                                </Button>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
