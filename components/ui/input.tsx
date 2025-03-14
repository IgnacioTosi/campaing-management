/**
 * Input Component
 *
 * This component provides a styled and accessible input field
 * with support for different states and customizable styles.
 * It's built using React's forwardRef to properly handle focus management
 * and integrates with form libraries.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    // Render the input element with merged classNames for styling
    return (
      <input
        // Default to text input if type is not specified
        type={type}
        // Combine default styles with any custom classes passed as props
        // The styles provide:
        // - Consistent sizing and spacing
        // - Border and rounded corners
        // - Transparent background to work with various container backgrounds
        // - Special styling for file inputs
        // - Focus states with ring outline
        // - Disabled state styling
        // - Responsive text size
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        // Forward the ref to the input element for external access
        ref={ref}
        // Spread any additional props to the input element
        {...props}
      />
    )
  }
)
// Set display name for better debugging in React DevTools
Input.displayName = "Input"

export { Input }
