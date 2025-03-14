"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampaignForm } from "@/components/campaign-form"
import { CampaignTable } from "@/components/campaign-table"
import type { Campaign } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

/**
 * CampaignDashboard Component
 *
 * This is the main page component for the campaign management dashboard.
 * It handles the state management, sorting, and CRUD operations for campaigns.
 */
export default function CampaignDashboard() {
  // State for storing the list of campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  // State for tracking which field to sort by
  const [sortField, setSortField] = useState<keyof Campaign>("name")
  // State for tracking sort direction (ascending or descending)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  // State for controlling the visibility of the add campaign modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Effect hook to load campaigns from localStorage when the component mounts
  useEffect(() => {
    const savedCampaigns = localStorage.getItem("campaigns")
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns))
    }
  }, [])

  // Effect hook to save campaigns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("campaigns", JSON.stringify(campaigns))
  }, [campaigns])

  /**
   * Adds a new campaign to the state and closes the modal
   * @param campaign - The campaign object to add
   */
  const handleAddCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign])
    setIsModalOpen(false) // Close modal after adding
  }

  /**
   * Deletes a campaign by its ID
   * @param id - The ID of the campaign to delete
   */
  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  /**
   * Handles sorting logic when a column header is clicked
   * @param field - The campaign field to sort by
   */
  const handleSort = (field: keyof Campaign) => {
    if (field === sortField) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // If sorting by a new field, set it and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Create a sorted copy of the campaigns array based on current sort settings
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // Special handling for profit calculation (derived field)
    if (sortField === "profit") {
      aValue = a.revenue - a.cost
      bValue = b.revenue - b.cost
    }

    // Convert date strings to timestamps for proper date comparison
    if (sortField === "startDate" || sortField === "endDate") {
      aValue = new Date(a[sortField] as string).getTime()
      bValue = new Date(b[sortField] as string).getTime()
    }

    // Ensure values are defined for comparison (fallback to 0)
    const aVal = aValue ?? 0
    const bVal = bValue ?? 0

    // Perform the comparison based on sort direction
    if (aVal < bVal) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (aVal > bVal) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header section with title and add button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Campaign Management Dashboard</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Campaign
          </Button>
        </div>

        {/* Campaign table component with sorting capabilities */}
        <CampaignTable
          campaigns={sortedCampaigns}
          onDelete={handleDeleteCampaign}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        {/* Modal dialog for adding new campaigns */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Campaign</DialogTitle>
            </DialogHeader>
            <CampaignForm onAddCampaign={handleAddCampaign} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
