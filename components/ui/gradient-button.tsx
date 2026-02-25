import React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string
  gradientTo?: string
  gradientAngle?: number
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ gradientFrom = "from-blue-600", gradientTo = "to-cyan-500", className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(
        `bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-white font-semibold`,
        className,
      )}
      {...props}
    />
  ),
)

GradientButton.displayName = "GradientButton"
