"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchDoctorById, clearSelectedDoctor } from "@/lib/store/slices/doctorSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    ArrowLeft,
    Star,
    Phone,
    Mail,
    MapPin,
    Clock,
    Award,
    Calendar,
    Briefcase
} from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export default function DoctorDetailPage() {
    const params = useParams()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { selectedDoctor: doctor, isLoading, error } = useAppSelector((state) => state.doctor)

    useEffect(() => {
        if (params.id) {
            dispatch(fetchDoctorById(params.id as string))
        }
        return () => {
            dispatch(clearSelectedDoctor())
        }
    }, [params.id, dispatch])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Skeleton className="h-8 w-32 mb-6" />
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <Skeleton className="h-64 w-full rounded-lg" />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Doctor Not Found</h2>
                    <p className="text-muted-foreground mb-6">{error || "The requested doctor could not be found."}</p>
                    <Link href="/doctors">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Doctors
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/doctors">
                    <Button variant="ghost" size="sm" className="mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Doctors
                    </Button>
                </Link>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Doctor Image & Quick Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-1"
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden mb-4">
                                    {doctor.image ? (
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                                                <span className="text-5xl font-bold text-primary">
                                                    {doctor.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center mb-4">
                                    <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
                                    <Badge variant="secondary" className="mb-3">
                                        {doctor.specialty}
                                    </Badge>

                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(doctor.rating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {doctor.rating.toFixed(1)} ({doctor.reviewCount} reviews)
                                    </p>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span>{doctor.experience} years experience</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span>{doctor.contactDetails.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span className="truncate">{doctor.contactDetails.email}</span>
                                    </div>
                                    {doctor.contactDetails.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                            <span>{doctor.contactDetails.address}</span>
                                        </div>
                                    )}
                                </div>

                                <Separator className="my-4" />

                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                                    <p className="text-3xl font-bold text-primary">
                                        Rs. {doctor.price.toLocaleString()}
                                    </p>
                                </div>

                                <Button className="w-full mt-4" size="lg">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book Appointment
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Doctor Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2 space-y-6"
                    >
                        {/* About */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                            </CardContent>
                        </Card>

                        {/* Qualifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Qualifications & Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {doctor.qualifications.map((qual, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            <span>{qual}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Availability */}
                        {doctor.availability && doctor.availability.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        Availability
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {doctor.availability.map((slot, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-lg border ${slot.isAvailable
                                                        ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                                        : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                                                    }`}
                                            >
                                                <p className="font-medium mb-1">{slot.day}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {slot.isAvailable
                                                        ? `${slot.startTime} - ${slot.endTime}`
                                                        : "Not Available"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews Section - Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Reviews</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-center py-8">
                                    Reviews will be displayed here
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
