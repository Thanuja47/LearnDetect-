"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchDoctors, createDoctor, updateDoctor, deleteDoctor } from "@/lib/store/slices/doctorSlice"
import { DoctorForm } from "@/components/doctor/doctor-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Search, Edit, Trash2, Loader2, Star, Stethoscope } from "lucide-react"
import { Doctor, DoctorFormData } from "@/lib/types/doctor"
import { toast } from "sonner"

export default function AdminDoctorsPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, isAuthenticated } = useAppSelector((state) => state.auth)
    const { doctors, isLoading } = useAppSelector((state) => state.doctor)

    const [searchQuery, setSearchQuery] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
            return
        }
        if (user?.role !== "ADMIN") {
            router.push("/login")
            return
        }
        dispatch(fetchDoctors({}))
    }, [isAuthenticated, user, router, dispatch])

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddDoctor = () => {
        setSelectedDoctor(null)
        setIsFormOpen(true)
    }

    const handleEditDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor)
        setIsFormOpen(true)
    }

    const handleDeleteClick = (doctor: Doctor) => {
        setSelectedDoctor(doctor)
        setIsDeleteDialogOpen(true)
    }

    const handleFormSubmit = async (data: DoctorFormData) => {
        setIsSubmitting(true)
        try {
            if (selectedDoctor) {
                await dispatch(updateDoctor({ id: selectedDoctor.id, data })).unwrap()
                toast.success("Doctor updated successfully")
            } else {
                await dispatch(createDoctor(data)).unwrap()
                toast.success("Doctor added successfully")
            }
            setIsFormOpen(false)
            dispatch(fetchDoctors({}))
        } catch (error: any) {
            toast.error(error || "An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!selectedDoctor) return

        setIsSubmitting(true)
        try {
            await dispatch(deleteDoctor(selectedDoctor.id)).unwrap()
            toast.success("Doctor deleted successfully")
            setIsDeleteDialogOpen(false)
            dispatch(fetchDoctors({}))
        } catch (error: any) {
            toast.error(error || "Failed to delete doctor")
        } finally {
            setIsSubmitting(false)
        }
    }

    const stats = {
        total: doctors.length,
        active: doctors.filter(d => d.isActive).length,
        specialties: new Set(doctors.map(d => d.specialty)).size,
        avgRating: doctors.length > 0
            ? (doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)
            : "0.0"
    }

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Doctor Management</h1>
                    <p className="text-muted-foreground mt-2">Manage doctors and their profiles</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Doctors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Specialties
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.specialties}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Avg Rating
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-1">
                                {stats.avgRating}
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions Bar */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle>All Doctors</CardTitle>
                                <CardDescription>
                                    {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddDoctor}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Doctor
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search doctors by name or specialty..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : filteredDoctors.length === 0 ? (
                            <div className="text-center py-12">
                                <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    {searchQuery ? "No doctors found matching your search" : "No doctors added yet"}
                                </p>
                            </div>
                        ) : (
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Specialty</TableHead>
                                            <TableHead>Experience</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Rating</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredDoctors.map((doctor) => (
                                            <TableRow key={doctor.id}>
                                                <TableCell className="font-medium">{doctor.name}</TableCell>
                                                <TableCell>{doctor.specialty}</TableCell>
                                                <TableCell>{doctor.experience} years</TableCell>
                                                <TableCell>Rs. {doctor.price.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        {doctor.rating.toFixed(1)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={doctor.isActive ? "default" : "secondary"}>
                                                        {doctor.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditDoctor(doctor)}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(doctor)}
                                                        >
                                                            <Trash2 className="w-4 h-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDoctor ? "Edit Doctor" : "Add New Doctor"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedDoctor
                                ? "Update the doctor's information below"
                                : "Fill in the details to add a new doctor to the system"}
                        </DialogDescription>
                    </DialogHeader>
                    <DoctorForm
                        initialData={selectedDoctor || undefined}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        isLoading={isSubmitting}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete <strong>{selectedDoctor?.name}</strong> from the system.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isSubmitting}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardLayout>
    )
}
