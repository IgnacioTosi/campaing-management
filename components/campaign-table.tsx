"use client"

import { ArrowDown, ArrowUp, ChevronsUpDownIcon as ChevronUpDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Campaign } from "@/lib/types"
import { CampaignCard } from "@/components/campaign-card"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useMemo, useCallback } from "react"

/**
 * Props for the CampaignTable component
 * Defines the expected properties for this component:
 * - campaigns: Array of Campaign objects to display
 * - onDelete: Callback function when a campaign is deleted
 * - onSort: Callback function when a column is sorted
 * - sortField: Current field being sorted
 * - sortDirection: Current sort direction (ascending or descending)
 */
interface CampaignTableProps {
  campaigns: Campaign[]
  onDelete: (id: string) => void
  onSort: (field: keyof Campaign) => void
  sortField: keyof Campaign
  sortDirection: "asc" | "desc"
}

/**
 * CampaignTable Component
 *
 * Displays campaigns in a table format for desktop and cards for mobile
 * Includes sorting functionality and campaign deletion
 * Responsive design with different layouts for different screen sizes
 */
export function CampaignTable({ campaigns, onDelete, onSort, sortField, sortDirection }: CampaignTableProps) {
  // Memoized function to render the appropriate sort icon based on current sort state
  const renderSortIcon = useCallback((field: keyof Campaign) => {
    if (sortField !== field) {
      return <ChevronUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }, [sortField, sortDirection]);

  // Event handler for column header clicks to trigger sorting
  const handleSortClick = useCallback((field: keyof Campaign) => {
    onSort(field);
  }, [onSort]);

  // Memoized sortable column header component to avoid unnecessary re-renders
  const SortableHeader = useCallback(({ field, label }: { field: keyof Campaign, label: string }) => (
    <th
      className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
      onClick={() => handleSortClick(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {renderSortIcon(field)}
      </div>
    </th>
  ), [handleSortClick, renderSortIcon]);

  // Memoized table rows to prevent re-rendering when unrelated state changes
  const tableRows = useMemo(() => campaigns.map((campaign) => {
    const profit = campaign.revenue - campaign.cost;
    const isProfitable = profit > 0;

    // Define fields to be displayed in the table
    const fields = [
      { value: campaign.name, className: "text-gray-900" },
      { value: formatDate(campaign.startDate), className: "text-gray-500" },
      { value: formatDate(campaign.endDate), className: "text-gray-500" },
      { value: campaign.clicks.toLocaleString(), className: "text-gray-500" },
      { value: formatCurrency(campaign.cost), className: "text-gray-500" },
      { value: formatCurrency(campaign.revenue), className: "text-gray-500" },
      { value: formatCurrency(profit), className: isProfitable ? "text-green-600" : "text-red-600" }
    ];

    return (
      <tr key={campaign.id} className="hover:bg-gray-50">
        {fields.map((field, index) => (
          <td key={index} className={`px-4 py-3 text-sm ${field.className}`}>{field.value}</td>
        ))}
        <td className="px-4 py-3 text-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(campaign.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </td>
      </tr>
    );
  }), [campaigns, onDelete]);

  // Memoized mobile card view for responsive design
  const mobileCards = useMemo(() => (
    <div className="md:hidden space-y-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onDelete={onDelete} />
      ))}
    </div>
  ), [campaigns, onDelete]);

  // Memoized empty state message when no campaigns exist
  const emptyCampaignsMessage = useMemo(() => (
    <Card className="p-8 text-center text-gray-500">
      No campaigns yet. Click &quot;Add Campaign&quot; to create your first campaign.
    </Card>
  ), []);

  return (
    <div>
      {campaigns.length === 0 ? (
        emptyCampaignsMessage
      ) : (
        <>
          {mobileCards}
          <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["name", "startDate", "endDate", "clicks", "cost", "revenue", "profit"].map((field) => (
                      <SortableHeader key={field} field={field as keyof Campaign} label={field.charAt(0).toUpperCase() + field.slice(1)} />
                    ))}
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
