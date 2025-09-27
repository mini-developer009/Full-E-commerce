import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProductItem {
  id: number;
  name: string;
  stock: number;
  imageUrl?: string;
}

interface ManageStockDialogProps {
  product: ProductItem;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onSave: (
    productId: number,
    newStock: number,
    reason: string,
    timestamp: string
  ) => void;
}

export default function ManageStockDialog({
  product,
  dialogOpen,
  setDialogOpen,
  onSave,
}: ManageStockDialogProps) {
  const [newStock, setNewStock] = useState(product.stock);
  const [reason, setReason] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTimestamp(now.toISOString().slice(0, 16)); // YYYY-MM-DDTHH:mm
  }, [product]);

  const handleSave = () => {
    if (newStock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    setIsSaving(true);
    try {
      onSave(product.id, newStock, reason.trim(), timestamp);
    } catch (error) {
      toast.error("Failed to update stock. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-md px-6 py-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            Manage Stock – <span className="text-primary truncate">{product.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {product.imageUrl && (
            <div className="flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-28 h-28 object-cover rounded-lg border shadow-md"
                loading="lazy"
              />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="stock-input" className="text-sm font-semibold">
              Enter New Stock Quantity
            </Label>
            <Input
              id="stock-input"
              type="number"
              min={0}
              value={newStock}
              onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
              className="text-center font-semibold text-lg"
              aria-describedby="stock-help"
              disabled={isSaving}
            />
            <p id="stock-help" className="text-xs text-muted-foreground mt-1">
              Please enter a value 0 or higher.
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="reason-input" className="text-sm font-semibold">
              Reason for Stock Change (optional)
            </Label>
            <textarea
              id="reason-input"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-md border border-border p-2 text-sm resize-none disabled:opacity-50"
              disabled={isSaving}
              placeholder="e.g., purchase, return, correction"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="datetime-input" className="text-sm font-semibold">
              Date & Time of Change
            </Label>
            <Input
              id="datetime-input"
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="flex justify-end gap-4 border-t pt-5">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Stock"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
