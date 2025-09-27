"use client"

import { useState } from "react"
import { LuPlus, LuTrash2, LuUpload, LuX } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Input } from "@/components/ui/input"
import type {
  ProductFormData,
  MultiSelectOption,
  VariantCombination,
} from "./types"
import { MediaLibraryDialog } from "@/components/media/media-library-dialog"


interface VariantManagerProps {
  formData: ProductFormData
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
}

interface VariantSelectorProps {
  options: MultiSelectOption[]
  values: Record<string, MultiSelectOption[]>
  onSubmit: (
    selectedOptions: string[],
    selectedValues: Record<string, string[]>
  ) => void
}

const VariantManager = ({ formData, setFormData }: VariantManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)

  const variantOptions: MultiSelectOption[] = [
    { value: "color", label: "Color" },
    { value: "size", label: "Size" },
    { value: "material", label: "Material" },
    { value: "style", label: "Style" },
  ]

  const variantValues: Record<string, MultiSelectOption[]> = {
    color: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
    ],
    size: [
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
    ],
    material: [
      { value: "cotton", label: "Cotton" },
      { value: "polyester", label: "Polyester" },
    ],
    style: [
      { value: "casual", label: "Casual" },
      { value: "formal", label: "Formal" },
    ],
  }

  const toggleVariants = () =>
    setFormData((prev) => ({
      ...prev,
      hasVariants: !prev.hasVariants,
      variants: !prev.hasVariants
        ? { options: [], combinations: [] }
        : undefined,
    }))

  const generateVariants = (
    opts: string[],
    vals: Record<string, string[]>
  ) => {
    if (opts.length === 0) return
    const combos = opts
      .map((o) => ({ name: o, values: vals[o] || [] }))
      .filter((o) => o.values.length > 0)
      .reduce((acc, cur) => {
        if (acc.length === 0)
          return cur.values.map((v) => ({ [cur.name]: v }))
        return acc.flatMap((combo) =>
          cur.values.map((v) => ({ ...combo, [cur.name]: v }))
        )
      }, [] as Record<string, string>[])

    setFormData((prev) => ({
      ...prev,
      variants: {
        options: opts.map((o) => ({
          name: o,
          values: variantValues[o].map((v) => v.value),
          selectedValues: vals[o] || [],
        })),
        combinations: combos.map((c, i) => ({
          id: crypto.randomUUID(),
          attributes: c,
          price: prev.price,
          sku: `${prev.sku}-${i + 1}`,
          quantity: 0,
          image: "",
        })),
      },
    }))

    setDialogOpen(false)
  }

  const changeCombo = (
    idx: number,
    field: keyof VariantCombination,
    value: any
  ) => {
    setFormData((prev) => {
      const combos = [...(prev.variants?.combinations ?? [])]
      combos[idx] = { ...combos[idx], [field]: value }
      return {
        ...prev,
        variants: { ...prev.variants!, combinations: combos },
      }
    })
  }

  const deleteCombo = (idx: number) =>
    setFormData((prev) => {
      const combos = [...(prev.variants?.combinations ?? [])]
      combos.splice(idx, 1)
      return {
        ...prev,
        variants: { ...prev.variants!, combinations: combos },
      }
    })

  return (
    <div className="mb-8 p-4 rounded-lg bg-muted/40">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg">Product Variants</h3>
          <p className="text-sm text-muted-foreground">
            Add options like color, size, material...
          </p>
        </div>
        <Button size="icon" variant="outline" onClick={toggleVariants}>
          <LuPlus className="h-5 w-5" />
        </Button>
      </div>

      {formData.hasVariants && (
        <>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mb-4">
                Manage Variants
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Manage Variants</DialogTitle>
              </DialogHeader>
              <VariantSelector
                options={variantOptions}
                values={variantValues}
                onSubmit={generateVariants}
              />
            </DialogContent>
          </Dialog>

          {(formData.variants?.combinations ?? []).length > 0 ? (
            <div className="overflow-x-auto bg-background rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 border">Image</th>
                    {formData.variants!.options.map((o:any) => (
                      <th key={o.name} className="p-2 border text-left capitalize">
                        {o.name}
                      </th>
                    ))}
                    <th className="p-2 border">SKU</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.variants!.combinations.map((c:any, i:any) => (
                    <tr key={c.id} className="hover:bg-muted/20">
                      <td className="p-2 border">
                        <div
                          className="w-16 h-16 border rounded overflow-hidden bg-muted/30 relative group cursor-pointer"
                          onClick={() => {
                            setTargetIndex(i)
                            setShowMediaLibrary(true)
                          }}
                        >
                          {c.image ? (
                            <>
                              <img
                                src={c.image}
                                alt="Variant"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  changeCombo(i, "image", "")
                                }}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 opacity-0 group-hover:opacity-100 transition"
                              >
                                <LuX className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                              <LuUpload className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>

                      {formData.variants!.options.map((o:any) => (
                        <td key={o.name} className="p-2 border capitalize">
                          {c.attributes[o.name]}
                        </td>
                      ))}
                      <td className="p-2 border">{c.sku}</td>
                      <td className="p-2 border">
                        <Input
                          type="number"
                          value={c.price}
                          onChange={(e) =>
                            changeCombo(i, "price", parseFloat(e.target.value))
                          }
                          className="w-24"
                        />
                      </td>
                      <td className="p-2 border">
                        <Input
                          type="number"
                          value={c.quantity}
                          onChange={(e) =>
                            changeCombo(i, "quantity", parseInt(e.target.value))
                          }
                          className="w-20"
                        />
                      </td>
                      <td className="p-2 border text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCombo(i)}
                          className="text-destructive"
                        >
                          <LuTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No variants yet — click "Manage Variants" to add.
            </p>
          )}
        </>
      )}

      {/* Media Library Dialog */}
      <MediaLibraryDialog
        open={showMediaLibrary}
        onOpenChange={setShowMediaLibrary}
        onSelect={(url) => {
          if (targetIndex !== null) {
            changeCombo(targetIndex, "image", url)
            setTargetIndex(null)
          }
        }}
      />
    </div>
  )
}

const VariantSelector = ({
  options,
  values,
  onSubmit,
}: VariantSelectorProps) => {
  const [opts, setOpts] = useState<string[]>([])
  const [vals, setVals] = useState<Record<string, string[]>>({})

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label>Select Variant Options</Label>
        <MultiSelect
          options={options}
          defaultValue={opts}
          onValueChange={(v) => {
            setOpts(v)
            setVals((p) =>
              v.reduce((acc, o) => {
                acc[o] = p[o] || []
                return acc
              }, {} as Record<string, string[]>)
            )
          }}
          placeholder="Choose options..."
        />
      </div>
      {opts.map((o) => (
        <div key={o} className="space-y-2">
          <Label>{o.charAt(0).toUpperCase() + o.slice(1)} Values</Label>
          <MultiSelect
            options={values[o] || []}
            defaultValue={vals[o] || []}
            onValueChange={(v) => setVals((p) => ({ ...p, [o]: v }))}
            placeholder={`Select ${o} values...`}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() => onSubmit(opts, vals)}
        disabled={opts.length === 0}
        className="w-full"
      >
        Generate Variants
      </Button>
    </div>
  )
}

export default VariantManager
