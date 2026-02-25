"use client"

import { DoctorFilters } from "@/lib/types/doctor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface DoctorFilterProps {
    filters: DoctorFilters
    onFilterChange: (filters: DoctorFilters) => void
    onClearFilters: () => void
}

const specialties = [
    "All Specialties",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic",
    "Psychiatrist",
    "General Physician",
    "ENT Specialist",
    "Ophthalmologist",
]

export function DoctorFilter({ filters, onFilterChange, onClearFilters }: DoctorFilterProps) {
    const handleSearchChange = (value: string) => {
        onFilterChange({ ...filters, search: value })
    }

    const handleSpecialtyChange = (value: string) => {
        onFilterChange({
            ...filters,
            specialty: value === "All Specialties" ? undefined : value
        })
    }

    const handlePriceChange = (values: number[]) => {
        onFilterChange({
            ...filters,
            minPrice: values[0],
            maxPrice: values[1]
        })
    }

    const handleRatingChange = (value: string) => {
        onFilterChange({
            ...filters,
            minRating: value === "all" ? undefined : parseFloat(value)
        })
    }

    const hasActiveFilters = filters.specialty || filters.minRating || filters.search

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filters</CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="h-8 text-xs"
                        >
                            <X className="w-3 h-3 mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <Label htmlFor="search">Search Doctor</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search by name..."
                            value={filters.search || ""}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select
                        value={filters.specialty || "All Specialties"}
                        onValueChange={handleSpecialtyChange}
                    >
                        <SelectTrigger id="specialty">
                            <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            {specialties.map((specialty) => (
                                <SelectItem key={specialty} value={specialty}>
                                    {specialty}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                    <Label>Price Range</Label>
                    <div className="px-2">
                        <Slider
                            min={0}
                            max={10000}
                            step={500}
                            value={[filters.minPrice || 0, filters.maxPrice || 10000]}
                            onValueChange={handlePriceChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Rs. {(filters.minPrice || 0).toLocaleString()}</span>
                        <span>Rs. {(filters.maxPrice || 10000).toLocaleString()}</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                    <Label htmlFor="rating">Minimum Rating</Label>
                    <Select
                        value={filters.minRating?.toString() || "all"}
                        onValueChange={handleRatingChange}
                    >
                        <SelectTrigger id="rating">
                            <SelectValue placeholder="Any rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Rating</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                            <SelectItem value="4.0">4.0+ Stars</SelectItem>
                            <SelectItem value="3.5">3.5+ Stars</SelectItem>
                            <SelectItem value="3.0">3.0+ Stars</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
