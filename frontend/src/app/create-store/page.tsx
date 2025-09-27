"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createShopAction } from "@/app/actions/auth/store/createShop";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import SetupHeader from "../setup/Header";

export default function CreateStorePage() {
    const router = useRouter();
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [storeFile, setStoreFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (file: File | null) => {
        setStoreFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!storeFile) {
            setMessage("Please select a store image");
            setSuccess(false);
            return;
        }

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("name", storeName);
                formData.append("address", storeAddress);
                formData.append("file", storeFile);

                const result = await createShopAction(formData);

                setMessage(result.message || null);
                setSuccess(result.success);

                if (result.success) {
                    router.push("/"); // Redirect to dashboard
                }
            } catch (err: any) {
                console.error(err);
                setMessage("Failed to create store. Try again.");
                setSuccess(false);
            }
        });
    }

    return (
        <>
            <SetupHeader />
            <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-12">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-foreground">Create Your Store</h1>
                        <p className="mt-2 text-muted-foreground">
                            Fill in the details below to set up your store
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-card shadow-sm rounded-lg p-8 flex flex-col gap-6"
                    >
                        {/* Store Name */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="storeName">Store Name</Label>
                            <Input
                                id="storeName"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                placeholder="Enter your store name"
                                required
                            />
                        </div>

                        {/* Store Address */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="storeAddress">Store Address</Label>
                            <Input
                                id="storeAddress"
                                value={storeAddress}
                                onChange={(e) => setStoreAddress(e.target.value)}
                                placeholder="Enter your store address"
                                required
                            />
                        </div>

                        {/* Store Image Upload */}
                        <div className="flex flex-col gap-2">
                            <Label>Store Logo / Image</Label>
                            <div className="relative flex flex-col items-center justify-center w-full h-52 border border-border border-dashed rounded-lg cursor-pointer hover:border-foreground transition-colors">
                                {!previewUrl ? (
                                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground pointer-events-none">
                                        <Upload className="w-10 h-10" />
                                        <p>Click or drag & drop to upload</p>
                                    </div>
                                ) : (
                                    <img
                                        src={previewUrl}
                                        alt="Store Preview"
                                        className="object-contain w-full h-full rounded-lg"
                                    />
                                )}
                                <Input
                                    id="storeFile"
                                    type="file"
                                    accept="image/*"
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>

                        {/* Feedback */}
                        {message && (
                            <p
                                className={cn(
                                    "text-center text-sm",
                                    success ? "text-success" : "text-destructive"
                                )}
                            >
                                {message}
                            </p>
                        )}

                        {/* Submit */}
                        <Button type="submit" className="w-full py-3" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Store"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
