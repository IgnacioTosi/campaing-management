"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Campaign } from "@/lib/types"

// Define the form schema with Zod
const campaignFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  clicks: z.coerce.number().nonnegative("Clicks must be a positive number"),
  cost: z.coerce.number().nonnegative("Cost must be a positive number"),
  revenue: z.coerce.number().nonnegative("Revenue must be a positive number"),
}).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  },
)

// Infer the type from the schema
type CampaignFormValues = z.infer<typeof campaignFormSchema>

interface CampaignFormProps {
  onAddCampaign: (campaign: Campaign) => void
}

// Define form fields with their properties
const formFields: { name: keyof CampaignFormValues; label: string; type: string; min?: string; step?: string }[] = [
  { name: "name", label: "Campaign Name", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "clicks", label: "Clicks", type: "number", min: "0" },
  { name: "cost", label: "Cost ($)", type: "number", min: "0", step: "0.01" },
  { name: "revenue", label: "Revenue ($)", type: "number", min: "0", step: "0.01" },
]

export function CampaignForm({ onAddCampaign }: CampaignFormProps) {
  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      clicks: 0,
      cost: 0,
      revenue: 0,
    },
  })

  // Handle form submission
  const onSubmit = (values: CampaignFormValues) => {
    const newCampaign: Campaign = {
      id: crypto.randomUUID(),
      ...values,
    }

    onAddCampaign(newCampaign)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(({ name, label, type, min, step }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input type={type} min={min} step={step} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          Add Campaign
        </Button>
      </form>
    </Form>
  )
}
