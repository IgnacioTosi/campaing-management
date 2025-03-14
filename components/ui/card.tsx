/**
 * Card Components
 *
 * This file defines a set of components for creating cards with a consistent design.
 * It includes components for the main card, header, title, description, content, and footer.
 */

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Card Component - Main container for the card
 *
 * This component serves as the outer wrapper for the card UI.
 * It provides the basic styling including rounded corners, border, and shadow effects.
 * The hover effect adds a subtle interaction feedback for users.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow transition-shadow hover:shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader Component - Top section of the card
 *
 * This component is designed to contain the card's title and description.
 * It provides appropriate spacing and padding for header content.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle Component - Title element for the card
 *
 * This component renders the card's main heading.
 * It uses an h3 element for better semantic HTML structure and accessibility.
 * The styling ensures the title stands out with appropriate font weight and spacing.
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription Component - Descriptive text for the card
 *
 * This component provides additional context or information about the card.
 * It uses a paragraph element for better semantic HTML structure.
 * The styling makes it visually distinct from the title with smaller, muted text.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent Component - Main content area of the card
 *
 * This component contains the primary content of the card.
 * It provides appropriate padding while ensuring proper spacing with the header.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter Component - Bottom section of the card
 *
 * This component is designed for actions or additional information at the bottom of the card.
 * It provides a flex layout for easy alignment of buttons or other interactive elements.
 * The justify-between class helps position elements at opposite ends of the footer.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Export all card components for use in other files
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
