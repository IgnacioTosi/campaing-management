/**
 * Font Configuration Module
 *
 * This file configures and exports the Inter font from Google Fonts
 * for use throughout the application.
 */

// Import the Inter font from Next.js font system
import { Inter } from "next/font/google";

/**
 * Configure the Inter font with Latin character subset
 *
 * The 'subsets' option specifies which character sets to include.
 * Using only the required subsets helps optimize font loading performance.
 *
 * This configured font can be imported in layout files and applied via className.
 */
export const inter = Inter({ subsets: ['latin'] });
