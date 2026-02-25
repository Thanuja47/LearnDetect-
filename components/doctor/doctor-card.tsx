"use client"

import { Doctor } from "@/lib/types/doctor"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

interface DoctorCardProps {
    doctor: Doctor
    index?: number
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    {doctor.image ? (
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl font-bold text-primary">
                                    {doctor.name.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                    {!doctor.isActive && (
                        <div className="absolute top-2 right-2">
                            <Badge variant="secondary">Unavailable</Badge>
                        </div>
                    )}
                </div>

                <CardContent className="pt-4 space-y-3">
                    <div>
                        <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                        <Badge variant="outline" className="mb-2">
                            {doctor.specialty}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(doctor.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="font-medium">{doctor.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{doctor.experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{doctor.contactDetails.phone}</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm text-muted-foreground">Consultation Fee</span>
                            <span className="text-2xl font-bold text-primary">
                                Rs. {doctor.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <Link href={`/doctors/${doctor.id}`} className="w-full">
                        <Button className="w-full group-hover:bg-primary/90 transition-colors">
                            View Profile
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
