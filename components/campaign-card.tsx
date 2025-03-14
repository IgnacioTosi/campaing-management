"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Campaign } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useMemo } from "react"

/**
 * Props interface for the CampaignCard component
 * Defines the expected props for this component:
 * - campaign: The campaign data to display
 * - onDelete: Callback function to handle deletion
 */
interface CampaignCardProps {
  campaign: Campaign
  onDelete: (id: string) => void
}

/**
 * CampaignCard Component
 *
 * This component displays a single campaign's details in a card format.
 * It's primarily used in mobile view as an alternative to the table view.
 *
 * Features:
 * - Displays campaign name, dates, metrics, and financial data
 * - Shows profit/loss with appropriate color coding
 * - Includes a delete button with confirmation
 * - Uses memoization to optimize performance
 *
 * @param {Campaign} campaign - The campaign data to display
 * @param {Function} onDelete - Callback function when delete is confirmed
 */
export function CampaignCard({ campaign, onDelete }: CampaignCardProps) {
  // Calculate campaign metrics with memoization to prevent unnecessary recalculations
  const campaignDetails = useMemo(() => {
    // Calculate profit and determine profitability
    const profit = campaign.revenue - campaign.cost
    const isProfitable = profit > 0

    // Return structured array of details to display in the card
    return [
      { label: "Start Date:", value: formatDate(campaign.startDate) },
      { label: "End Date:", value: formatDate(campaign.endDate) },
      { label: "Clicks:", value: campaign.clicks.toLocaleString() },
      { label: "Cost:", value: formatCurrency(campaign.cost) },
      { label: "Revenue:", value: formatCurrency(campaign.revenue) },
      {
        label: "Profit:",
        value: formatCurrency(profit),
        className: isProfitable ? "text-green-600" : "text-red-600", // Green for profit, red for loss
        isBold: true
      }
    ]
  }, [campaign])

  // Memoize the delete handler to prevent unnecessary function creation
  const handleDelete = useMemo(() =>
    () => onDelete(campaign.id),
    [campaign.id, onDelete]
  )

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Card header with campaign name and delete button */}
        <div className="p-4 bg-gray-50 flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{campaign.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            aria-label="Delete campaign"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>

        {/* Campaign details section - displays all metrics in a consistent layout */}
        <div className="p-4 space-y-2">
          {campaignDetails.map((detail, index) => (
            <div key={index} className={`grid grid-cols-2 text-sm ${detail.isBold ? "font-medium" : ""}`}>
              <span className="text-gray-500">{detail.label}</span>
              <span className={detail.className || ""}>{detail.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
