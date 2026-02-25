"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AddChildForm } from "@/components/parent/add-child-form"

export default function AddChildPage() {
  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-2">
        <Link href="/parent-dashboard/children">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Children
          </Button>
        </Link>
      </div>

      {/* Form */}
      <AddChildForm />
    </div>
  )
}
