"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";
import { QrCode, Camera } from "lucide-react";
import { nanoid } from "nanoid";

const OpenScannerDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [scanToken, setScanToken] = useState<string | null>(null);

  const generateScanUrl = () => {
    const token = nanoid();
    const url = `${window.location.origin}/scan/${token}`;
    setScanToken(token);
    return url;
  };

  const handleComputerScan = () => {
    const scanUrl = generateScanUrl();
    setDialogOpen(false); // Close the dialog

    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      scanUrl,
      "ScannerWindow",
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no,toolbar=no,menubar=no,status=no`
    );
  };

  const handlePhoneScan = () => {
    const scanUrl = generateScanUrl();
    setShowQRCode(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Camera className="w-4 h-4" />
          Open Scanner
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md space-y-6">
        <DialogHeader>
          <DialogTitle>Bar/QR Code Scanner</DialogTitle>
          <DialogDescription>
            Choose how you'd like to scan your item.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            onClick={handleComputerScan}
            variant="default"
            className="w-full"
          >
            Use Computer Camera
          </Button>

          <Separator />

          <Button
            onClick={handlePhoneScan}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Use Phone Camera (via QR Code)
          </Button>

          {showQRCode && scanToken && (
            <div className="mt-4 space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                📱 Scan this QR code using your <strong>phone camera</strong> to begin scanning.
              </p>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-md shadow">
                  <QRCode value={`${window.location.origin}/scan/${scanToken}`} size={160} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Or go to: <code className="font-mono">/scan/{scanToken}</code>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenScannerDialog;
