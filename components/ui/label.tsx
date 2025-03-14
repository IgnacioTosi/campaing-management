"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Label style variants
 *
 * Defines the base styling for label components with consistent text size,
 * font weight, and line height. Includes special styling for when the associated
 * form element is disabled, showing appropriate cursor and reduced opacity.
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Label Component
 *
 * An accessible form label component built on Radix UI primitives.
 * Features:
 * - Forwards refs for DOM access and focus management
 * - Integrates with form controls using Tailwind's peer modifier
 * - Supports custom styling through className prop
 * - Maintains accessibility best practices
 * - Automatically handles disabled states of associated form elements
 *
 * Usage:
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

// Export both the component and its style variants for use in other components
export { Label, labelVariants }
