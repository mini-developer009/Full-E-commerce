"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner";

const permissionsData = [
  { category: "Main", actions: ["All", "Settings"] },
  { category: "Clients", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Clients Group", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Clients Loan", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Clients Money Return", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Suppliers", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Suppliers Group", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Account", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Receives", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Expenses", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Supplier Payment", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Transfer", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Project", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Invoice", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Draft Invoice", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Invoice Return", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Asset And Stock", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Raw Material", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Batch Product", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Warehouse", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Group", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Unit", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Asset", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Barcode", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Purchase", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Product Return", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Staff", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Receive Category", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Expense Category", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Chart Of Account", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Chart Of Account Group", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Chart Of Account Subcategory", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Shortcut Menu", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Payment Method", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Bank", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Mortgage", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Mohajon", actions: ["Visibility", "Create", "Edit", "View", "Delete"] },
  { category: "Store Information", actions: ["Visibility", "Edit"] },
  { category: "Profit", actions: ["View"] },
  { category: "Report", actions: ["Report", "Report", "Report", "Report", "Report"] },
]

export function UserPermissionSheet({
  children,
  userName = "suborno",
}: {
  children: React.ReactNode
  userName?: string
}) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({})

  const toggleCheckbox = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSave = () => {
    const selectedPermissions = Object.entries(checked)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    console.log("Selected Permissions:", selectedPermissions)

    toast.success("Permissions saved successfully ✅")
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg font-semibold">
            Assign Permissions to <span className="text-primary">({userName})</span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] pr-3">
          <div className="space-y-5">
            {permissionsData.map((section) => (
              <div key={section.category} className="border-b pb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {section.category}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.actions.map((action) => {
                    const id = `${section.category}-${action}`
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex items-center space-x-2 text-sm cursor-pointer"
                      >
                        <Checkbox
                          id={id}
                          checked={checked[id] || false}
                          onCheckedChange={() => toggleCheckbox(id)}
                        />
                        <span>{action}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="px-6">
            Save Permissions <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
