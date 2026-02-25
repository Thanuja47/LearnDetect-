"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChildDetailModal } from "@/components/parent/child-detail-modal"
import { ChevronLeft, Pencil, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { ParentSidebar } from "@/components/layout/parent-sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchChildById, updateChild, deleteChild } from "@/lib/store/slices/parentSlice"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ChildDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const childId = params.id as string
  
  const { selectedChild, isLoading } = useAppSelector((state) => state.parent)
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    grade: "",
    gender: "",
  })

  useEffect(() => {
    if (childId) {
      dispatch(fetchChildById(childId))
    }
  }, [dispatch, childId])

  useEffect(() => {
    if (selectedChild) {
      setEditForm({
        firstName: selectedChild.firstName || "",
        lastName: selectedChild.lastName || "",
        dateOfBirth: selectedChild.dateOfBirth?.split("T")[0] || "",
        grade: selectedChild.grade || "",
        gender: selectedChild.gender || "",
      })
    }
  }, [selectedChild])

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await dispatch(updateChild({ id: childId, data: editForm })).unwrap()
      toast.success("Child updated successfully")
      setIsEditDialogOpen(false)
      dispatch(fetchChildById(childId)) // Refresh data
    } catch (error: any) {
      toast.error(error || "Failed to update child")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await dispatch(deleteChild(childId)).unwrap()
      toast.success("Child deleted successfully")
      router.push("/parent-dashboard/children")
    } catch (error: any) {
      toast.error(error || "Failed to delete child")
    } finally {
      setIsDeleting(false)
    }
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (isLoading) {
    return (
      <div className="md:flex h-screen">
        <ParentSidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!selectedChild) {
    return (
      <div className="md:flex h-screen">
        <ParentSidebar />
        <div className="flex-1 p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Child not found.</p>
            <Link href="/parent-dashboard/children">
              <Button variant="outline" className="mt-4">
                Back to Children
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const childName = `${selectedChild.firstName || ""} ${selectedChild.lastName || ""}`.trim() || "Unnamed"
  const childAge = selectedChild.dateOfBirth ? calculateAge(selectedChild.dateOfBirth) : 0

  return (
    <div className="md:flex h-screen">
      <ParentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header with Back and Actions */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/parent-dashboard/children">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back to Children
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <ChildDetailModal 
            childId={childId} 
            name={childName} 
            age={childAge} 
            grade={selectedChild.grade || "N/A"} 
          />
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Child</DialogTitle>
            <DialogDescription>
              Make changes to your child's information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={editForm.dateOfBirth}
                onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select
                value={editForm.grade}
                onValueChange={(value) => setEditForm({ ...editForm, grade: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-K">Pre-K</SelectItem>
                  <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                  <SelectItem value="1st">1st Grade</SelectItem>
                  <SelectItem value="2nd">2nd Grade</SelectItem>
                  <SelectItem value="3rd">3rd Grade</SelectItem>
                  <SelectItem value="4th">4th Grade</SelectItem>
                  <SelectItem value="5th">5th Grade</SelectItem>
                  <SelectItem value="6th">6th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={editForm.gender}
                onValueChange={(value) => setEditForm({ ...editForm, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{childName}</span> and all associated data including assessments and progress records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
