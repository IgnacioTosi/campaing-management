/**
 * Button Component
 *
 * This file defines a customizable Button component using Radix UI and class-variance-authority.
 * It provides various styles, sizes, and states for buttons throughout the application.
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Allows rendering another component in place of this one
import { cva, type VariantProps } from "class-variance-authority" // For creating variant-based component styling

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Button variant definitions using class-variance-authority
 * This defines all possible visual variations of the button component
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Different visual styles for the button
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/95",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/85",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
        success:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800",
      },
      // Different size options for the button
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
      // Option to make the button take full width of its container
      fullWidth: {
        true: "w-full",
      },
      // Loading state styling
      loading: {
        true: "opacity-70 cursor-wait",
      }
    },
    // Default values if variants aren't specified
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      loading: false,
    },
  }
)

/**
 * Button component props interface
 * Extends HTML button attributes and adds custom props for our variants
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // When true, renders children as the root element instead of a button
  loading?: boolean // Controls loading state
  leftIcon?: React.ReactNode // Icon to display on the left side
  rightIcon?: React.ReactNode // Icon to display on the right side
}

/**
 * Button component implementation
 * A flexible button component with various styling options and states
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, asChild = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    // Use Slot if asChild is true, otherwise use a regular button element
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        // Button is disabled if explicitly set or in loading state
        disabled={disabled || loading}
        {...props}
      >
        {/* Show loading spinner when in loading state */}
        {loading && (
          <svg className="animate-spin -ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        {/* Show left icon if provided and not in loading state */}
        {leftIcon && !loading && leftIcon}
        {/* Main button content */}
        {children}
        {/* Show right icon if provided */}
        {rightIcon && rightIcon}
      </Comp>
    )
  }
)
// Set display name for React DevTools
Button.displayName = "Button"

// Export the Button component and its variants for use in other files
export { Button, buttonVariants }
