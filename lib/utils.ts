/**
 * Utility Functions Module
 *
 * This file contains various utility functions used throughout the application.
 * These functions handle common tasks like CSS class manipulation, currency formatting,
 * and date formatting to maintain consistency across the application.
 */

/**
 * Imports for CSS class handling libraries:
 * - clsx: A utility for constructing className strings conditionally
 * - tailwind-merge: A utility to merge Tailwind CSS classes without style conflicts
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn (classNames) - Utility function to combine CSS class names
 *
 * This function combines multiple class names, conditional classes, and
 * resolves any Tailwind CSS conflicts that might occur when classes are combined.
 * It's particularly useful for components that accept className props.
 *
 * @param inputs - List of CSS classes to combine (strings, objects, arrays)
 * @returns String with combined classes and resolved Tailwind conflicts
 *
 * Example usage:
 * cn('text-red-500', isActive && 'bg-blue-200', ['p-2', 'rounded'])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * formatCurrency - Formats a numeric value as US dollars
 *
 * This function takes a number and formats it as a currency string
 * using the US locale and USD currency format.
 *
 * @param value - Numeric value to format as currency
 * @returns String formatted as USD currency (e.g. "$1,234.56")
 *
 * Example usage:
 * formatCurrency(1234.56) // Returns "$1,234.56"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * formatDate - Converts a date string into a human-readable format
 *
 * This function takes a date string (typically in ISO format) and
 * converts it to a more readable format using the US locale.
 *
 * @param dateString - Date string to format (e.g. "2023-01-01")
 * @returns String with formatted date (e.g. "Jan 1, 2023")
 *
 * Example usage:
 * formatDate("2023-01-01") // Returns "Jan 1, 2023"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}
