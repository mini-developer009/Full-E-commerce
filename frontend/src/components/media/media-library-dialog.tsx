"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaGallery } from "./media-gallery"
import { MediaUploader } from "./media-uploader"

interface MediaLibraryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (url: string) => void
}

export function MediaLibraryDialog({ open, onOpenChange, onSelect }: MediaLibraryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                    <DialogDescription>
                        Select an existing image or upload a new one for your blog post.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <Tabs defaultValue="browse" className="h-full flex flex-col">
                        <TabsList className="mx-auto">
                            <TabsTrigger value="browse">Browse Media</TabsTrigger>
                            <TabsTrigger value="upload">Upload New</TabsTrigger>
                        </TabsList>
                        <TabsContent value="browse" className="flex-1 overflow-auto">
                            <div className="h-[500px]">
                                <MediaGallery
                                    isDialog={true}
                                    onSelect={(media) => {
                                        if (media) {
                                            onSelect(media.url)
                                            onOpenChange(false)
                                        }
                                    }}
                                    isUploadButtonVisible={false}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="upload" className="flex-1 overflow-auto">
                            <MediaUploader
                                isOpen={true}
                                isEmbedded={true}
                                onClose={() => { }}
                                onUpload={(media) => {
                                    if (media.length > 0) {
                                        onSelect(media[0].url)
                                        onOpenChange(false)
                                    }
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}