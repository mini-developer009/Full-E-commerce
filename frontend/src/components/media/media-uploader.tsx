"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { ImageIcon, UploadIcon, VideoIcon, XIcon } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MediaUploaderProps {
    isOpen: boolean
    onClose: () => void
    onUpload: (media: any[]) => void
    isEmbedded?: boolean
}

export function MediaUploader({ isOpen, onClose, onUpload, isEmbedded = false }: MediaUploaderProps) {
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [mediaDetails, setMediaDetails] = React.useState<
        Record<string, { title: string; description: string; tags: string }>
    >({})

    // Handle file drop
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            "video/*": [],
        },
        onDrop: (acceptedFiles:any) => {
            const newFiles = acceptedFiles.filter(
                (file:any) => !files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size),
            )

            setFiles([...files, ...newFiles])

            // Initialize media details for new files
            const newMediaDetails = { ...mediaDetails }
            newFiles.forEach((file:any) => {
                newMediaDetails[file.name] = {
                    title: file.name.split(".")[0],
                    description: "",
                    tags: "",
                }
            })
            setMediaDetails(newMediaDetails)
        },
    })

    // Handle file removal
    const handleRemoveFile = (index: number) => {
        const newFiles = [...files]
        const removedFile = newFiles.splice(index, 1)[0]
        setFiles(newFiles)

        // Remove media details for the removed file
        const newMediaDetails = { ...mediaDetails }
        delete newMediaDetails[removedFile.name]
        setMediaDetails(newMediaDetails)
    }

    // Handle media details change
    const handleDetailsChange = (fileName: string, field: string, value: string) => {
        setMediaDetails({
            ...mediaDetails,
            [fileName]: {
                ...mediaDetails[fileName],
                [field]: value,
            },
        })
    }

    // Handle upload
    const handleUpload = async () => {
        if (files.length === 0) return

        setUploading(true)

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 5
            })
        }, 100)

        // Simulate file upload and processing
        setTimeout(() => {
            clearInterval(interval)
            setProgress(100)

            // Create media objects from files
            const uploadedMedia = files.map((file) => {
                const details = mediaDetails[file.name]
                const isImage = file.type.startsWith("image/")
                const isVideo = file.type.startsWith("video/")

                // Create object URL for preview
                const url = URL.createObjectURL(file)

                return {
                    id: uuidv4(),
                    title: details.title || file.name.split(".")[0],
                    description: details.description || "",
                    type: isImage ? "image" : isVideo ? "video" : "file",
                    url: url,
                    thumbnailUrl: isImage ? url : null,
                    uploadDate: new Date().toISOString(),
                    size: file.size,
                    dimensions: isImage ? { width: 1200, height: 800 } : undefined,
                    duration: isVideo ? 60 : undefined,
                    tags: details.tags ? details.tags.split(",").map((tag) => tag.trim()) : [],
                }
            })

            // Call onUpload with the new media
            onUpload(uploadedMedia)

            // Reset state
            setFiles([])
            setMediaDetails({})
            setUploading(false)
            setProgress(0)
        }, 2000)
    }

    // Get file icon based on type
    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-8 w-8 text-blue-500" />
        } else if (file.type.startsWith("video/")) {
            return <VideoIcon className="h-8 w-8 text-purple-500" />
        } else {
            return (
                <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {file.name.split(".").pop()?.toUpperCase()}
                </div>
            )
        }
    }

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    if (isEmbedded) {
        return (
            <div className="p-4 space-y-6">
                {/* Dropzone */}
                {files.length === 0 && (
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <UploadIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-1">Drag & drop files here</h3>
                        <p className="text-sm text-muted-foreground mb-4">or click to browse your files</p>
                        <Button type="button" variant="outline">
                            Select Files
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">Supported formats: JPEG, PNG, GIF, WebP, MP4, WebM</p>
                    </div>
                )}

                {/* File list */}
                {files.length > 0 && (
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                            {files.map((file, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    {/* File content (same as original) */}
                                    <div className="flex items-start gap-4">
                                        {/* File preview */}
                                        <div className="h-16 w-16 rounded bg-muted flex items-center justify-center overflow-hidden">
                                            {file.type.startsWith("image/") ? (
                                                <img
                                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                                    alt={file.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                getFileIcon(file)
                                            )}
                                        </div>

                                        {/* File details */}
                                        <div className="flex-1 space-y-3">
                                            <div className="space-y-1">
                                                <Label htmlFor={`title-${index}`}>Title</Label>
                                                <Input
                                                    id={`title-${index}`}
                                                    value={mediaDetails[file.name]?.title || ""}
                                                    onChange={(e) => handleDetailsChange(file.name, "title", e.target.value)}
                                                    placeholder="Enter title"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor={`description-${index}`}>Description</Label>
                                                <Textarea
                                                    id={`description-${index}`}
                                                    value={mediaDetails[file.name]?.description || ""}
                                                    onChange={(e) => handleDetailsChange(file.name, "description", e.target.value)}
                                                    placeholder="Enter description"
                                                    className="resize-none h-20"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor={`tags-${index}`}>Tags (comma separated)</Label>
                                                <Input
                                                    id={`tags-${index}`}
                                                    value={mediaDetails[file.name]?.tags || ""}
                                                    onChange={(e) => handleDetailsChange(file.name, "tags", e.target.value)}
                                                    placeholder="e.g., logo, branding, marketing"
                                                />
                                            </div>
                                        </div>

                                        {/* Remove button */}
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)} disabled={uploading}>
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* File info */}
                                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                        <span>{file.name}</span>
                                        <span>{formatFileSize(file.size)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add more files button */}
                        <div {...getRootProps()} className="border border-dashed rounded-lg p-4 text-center cursor-pointer mt-4">
                            <input {...getInputProps()} />
                            <p className="text-sm text-muted-foreground">Drop more files here or click to browse</p>
                        </div>
                    </ScrollArea>
                )}

                {/* Upload progress */}
                {uploading && (
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Uploading {files.length} file(s)...</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose} disabled={uploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
                        {uploading ? "Uploading..." : `Upload ${files.length} file(s)`}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                {/* Original dialog content */}
                <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                    <DialogDescription>Upload images and videos to your media library.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden">
                    {/* Dropzone */}
                    {files.length === 0 && (
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <UploadIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-1">Drag & drop files here</h3>
                            <p className="text-sm text-muted-foreground mb-4">or click to browse your files</p>
                            <Button type="button" variant="outline">
                                Select Files
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4">Supported formats: JPEG, PNG, GIF, WebP, MP4, WebM</p>
                        </div>
                    )}

                    {/* File list */}
                    {files.length > 0 && (
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-4">
                                {files.map((file, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            {/* File preview */}
                                            <div className="h-16 w-16 rounded bg-muted flex items-center justify-center overflow-hidden">
                                                {file.type.startsWith("image/") ? (
                                                    <img
                                                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                                                        alt={file.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    getFileIcon(file)
                                                )}
                                            </div>

                                            {/* File details */}
                                            <div className="flex-1 space-y-3">
                                                <div className="space-y-1">
                                                    <Label htmlFor={`title-${index}`}>Title</Label>
                                                    <Input
                                                        id={`title-${index}`}
                                                        value={mediaDetails[file.name]?.title || ""}
                                                        onChange={(e) => handleDetailsChange(file.name, "title", e.target.value)}
                                                        placeholder="Enter title"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor={`description-${index}`}>Description</Label>
                                                    <Textarea
                                                        id={`description-${index}`}
                                                        value={mediaDetails[file.name]?.description || ""}
                                                        onChange={(e) => handleDetailsChange(file.name, "description", e.target.value)}
                                                        placeholder="Enter description"
                                                        className="resize-none h-20"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor={`tags-${index}`}>Tags (comma separated)</Label>
                                                    <Input
                                                        id={`tags-${index}`}
                                                        value={mediaDetails[file.name]?.tags || ""}
                                                        onChange={(e) => handleDetailsChange(file.name, "tags", e.target.value)}
                                                        placeholder="e.g., logo, branding, marketing"
                                                    />
                                                </div>
                                            </div>

                                            {/* Remove button */}
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)} disabled={uploading}>
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* File info */}
                                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                            <span>{file.name}</span>
                                            <span>{formatFileSize(file.size)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add more files button */}
                            <div {...getRootProps()} className="border border-dashed rounded-lg p-4 text-center cursor-pointer mt-4">
                                <input {...getInputProps()} />
                                <p className="text-sm text-muted-foreground">Drop more files here or click to browse</p>
                            </div>
                        </ScrollArea>
                    )}

                    {/* Upload progress */}
                    {uploading && (
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Uploading {files.length} file(s)...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={uploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
                        {uploading ? "Uploading..." : `Upload ${files.length} file(s)`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
