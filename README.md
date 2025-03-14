# Campaign Management Dashboard

A modern, responsive web application for managing marketing campaigns built with Next.js and React. This dashboard allows users to track campaign performance metrics, calculate profits, and manage campaign data with an intuitive user interface.

## Features

- **Campaign Management**: Add and delete marketing campaigns
- **Data Visualization**: View campaign metrics in a clean, organized table
- **Sorting Functionality**: Sort campaigns by any field (name, dates, metrics)
- **Profit Calculation**: Automatic calculation of profit based on revenue and cost
- **Form Validation**: Comprehensive validation with error messages
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Local Storage**: Campaign data persists between sessions
- **Accessibility**: Built with accessibility best practices

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Performant, flexible form validation
- **Lucide React**: Beautiful, consistent icons
- **LocalStorage API**: For client-side data persistence

## Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IgnacioTosi/campaing-management.git
   cd campaing-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Production Build

1. Build the application for production:
   ```bash
   npm build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

The project follows a clean, modular architecture:

campaign-management-dashboard/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── campaign-card.tsx   # Mobile view card component
│   ├── campaign-form.tsx   # Form for adding campaigns
│   ├── campaign-table.tsx  # Table for displaying campaigns
│   ├── theme-provider.tsx  # Theme context provider
│   └── ui/                 # UI components from shadcn
├── lib/                    # Utility functions and types
│   ├── types.ts            # TypeScript interfaces
│   ├── fonts.ts            # Fonts
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
└── README.md               # Project documentation

## Core Components

### Campaign Dashboard (`app/page.tsx`)

The main page component that manages:

- Campaign state and localStorage persistence
- Sorting functionality
- Modal for adding new campaigns

### Campaign Form (`components/campaign-form.tsx`)

A form component for adding new campaigns with:

- Zod schema validation
- React Hook Form integration
- Prevention of negative values for numeric fields
- Date validation (end date must be after start date)

### Campaign Table (`components/campaign-table.tsx`)

Displays campaigns in a sortable table with:

- Responsive design (table for desktop, cards for mobile)
- Sort indicators for column headers
- Color-coded profit display
- Delete functionality

### Campaign Card (`components/campaign-card.tsx`)

Mobile-friendly card view for campaigns that displays:

- All campaign details in a compact format
- Color-coded profit information
- Delete button

## Data Model

The application uses the following data structure for campaigns:

```typescript
interface Campaign {
  id: string;           // Unique identifier
  name: string;         // Campaign name
  startDate: string;    // Start date in ISO format
  endDate: string;      // End date in ISO format
  clicks: number;       // Number of clicks
  cost: number;         // Campaign cost in dollars
  revenue: number;      // Campaign revenue in dollars
  profit?: number;      // Calculated field (revenue - cost)
}
```

## Form Validation

The form implements the following validation rules:

- All fields are required
- Numeric fields must be non-negative
- End date must be after start date
- Real-time validation with error messages

## Future Enhancements

Potential improvements for future versions:

- Dark mode support
- Data export functionality (CSV, PDF)
- Campaign analytics and charts
- Filter functionality
- Campaign editing
- User authentication
- Backend integration for data persistence
- Campaign categories or tags
