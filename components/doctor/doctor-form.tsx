"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { doctorSchema, DoctorFormData } from "@/lib/types/doctor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Loader2 } from "lucide-react"
import { useState } from "react"

interface DoctorFormProps {
    initialData?: Partial<DoctorFormData>
    onSubmit: (data: DoctorFormData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

const specialties = [
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

export function DoctorForm({ initialData, onSubmit, onCancel, isLoading = false }: DoctorFormProps) {
    const [qualifications, setQualifications] = useState<string[]>(initialData?.qualifications || [""])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<DoctorFormData>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            name: initialData?.name || "",
            specialty: initialData?.specialty || "",
            experience: initialData?.experience || 0,
            price: initialData?.price || 0,
            bio: initialData?.bio || "",
            contactDetails: {
                phone: initialData?.contactDetails?.phone || "",
                email: initialData?.contactDetails?.email || "",
                address: initialData?.contactDetails?.address || "",
            },
            qualifications: initialData?.qualifications || [],
            image: initialData?.image || "",
            isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
        },
    })

    const specialty = watch("specialty")

    const addQualification = () => {
        setQualifications([...qualifications, ""])
    }

    const removeQualification = (index: number) => {
        const updated = qualifications.filter((_, i) => i !== index)
        setQualifications(updated)
        setValue("qualifications", updated.filter(q => q.trim() !== ""))
    }

    const updateQualification = (index: number, value: string) => {
        const updated = [...qualifications]
        updated[index] = value
        setQualifications(updated)
        setValue("qualifications", updated.filter(q => q.trim() !== ""))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the doctor's basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Dr. John Doe"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="specialty">Specialty *</Label>
                            <Select
                                value={specialty}
                                onValueChange={(value) => setValue("specialty", value)}
                            >
                                <SelectTrigger id="specialty">
                                    <SelectValue placeholder="Select specialty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {specialties.map((spec) => (
                                        <SelectItem key={spec} value={spec}>
                                            {spec}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.specialty && (
                                <p className="text-sm text-destructive">{errors.specialty.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience *</Label>
                            <Input
                                id="experience"
                                type="number"
                                {...register("experience", { valueAsNumber: true })}
                                placeholder="10"
                            />
                            {errors.experience && (
                                <p className="text-sm text-destructive">{errors.experience.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Consultation Fee (Rs.) *</Label>
                            <Input
                                id="price"
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="2500"
                            />
                            {errors.price && (
                                <p className="text-sm text-destructive">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio *</Label>
                        <Textarea
                            id="bio"
                            {...register("bio")}
                            placeholder="Brief description about the doctor..."
                            rows={4}
                        />
                        {errors.bio && (
                            <p className="text-sm text-destructive">{errors.bio.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Profile Image URL</Label>
                        <Input
                            id="image"
                            {...register("image")}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Qualifications</CardTitle>
                    <CardDescription>Add the doctor's qualifications and certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {qualifications.map((qual, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={qual}
                                onChange={(e) => updateQualification(index, e.target.value)}
                                placeholder="e.g., MBBS, MD (Cardiology)"
                            />
                            {qualifications.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeQualification(index)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addQualification}
                        className="w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Qualification
                    </Button>
                    {errors.qualifications && (
                        <p className="text-sm text-destructive">{errors.qualifications.message}</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>Enter contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                {...register("contactDetails.phone")}
                                placeholder="+94 77 123 4567"
                            />
                            {errors.contactDetails?.phone && (
                                <p className="text-sm text-destructive">{errors.contactDetails.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("contactDetails.email")}
                                placeholder="doctor@example.com"
                            />
                            {errors.contactDetails?.email && (
                                <p className="text-sm text-destructive">{errors.contactDetails.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Clinic Address</Label>
                        <Input
                            id="address"
                            {...register("contactDetails.address")}
                            placeholder="123 Main Street, Colombo"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {initialData ? "Update Doctor" : "Add Doctor"}
                </Button>
            </div>
        </form>
    )
}
