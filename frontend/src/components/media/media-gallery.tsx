"use client"

import * as React from "react"
import {
    Grid3X3Icon,
    ListIcon,
    SearchIcon,
    SlidersHorizontalIcon,
    Trash2Icon,
    UploadIcon,
    PlusIcon,
    Share2Icon,
    LinkIcon,
    DownloadIcon,
    InfoIcon,
    StarIcon,
    MoreVerticalIcon
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MediaUploader } from "./media-uploader"
import { Card } from "../ui/card"

type MediaType = 'image' | 'video' | 'file'

interface MediaItem {
    id: string
    title: string
    type: MediaType
    url: string
    thumbnailUrl?: string
    size: number
    uploadDate: string
    description?: string
    tags?: string[]
    width?: number
    height?: number
}

interface MediaGalleryProps {
    isDialog?: boolean
    onSelect?: (media: MediaItem) => void
    isUploadButtonVisible?: boolean
}

export function MediaGallery({ isDialog = false, onSelect, isUploadButtonVisible = true }: MediaGalleryProps) {
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [sortBy, setSortBy] = React.useState<"date" | "name" | "size">("date")
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc")
    const [selectedMedia, setSelectedMedia] = React.useState<string | null>(null)
    const [mediaToDelete, setMediaToDelete] = React.useState<MediaItem | null>(null)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [mediaItems, setMediaItems] = React.useState<MediaItem[]>([])
    const [isUploading, setIsUploading] = React.useState(false)
    const [selectedMediaDetails, setSelectedMediaDetails] = React.useState<MediaItem | null>(null)
    const [showUploadDialog, setShowUploadDialog] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const itemsPerPage = 12

    // Load initial media items
    React.useEffect(() => {
        const initialMedia: MediaItem[] = [
            {
                id: '1',
                title: 'Nature.jpg',
                type: 'image',
                url: '/placeholder.svg',
                thumbnailUrl: '/placeholder.svg',
                size: 1024 * 1024 * 2.5,
                uploadDate: '2023-10-15',
                description: 'Beautiful nature landscape',
                tags: ['nature', 'landscape'],
                width: 1920,
                height: 1080
            },
            {
                id: '2',
                title: 'Demo.mp4',
                type: 'video',
                url: '/demo.mp4',
                thumbnailUrl: '/placeholder.svg',
                size: 1024 * 1024 * 15,
                uploadDate: '2023-10-10',
                description: 'Product demo video',
                tags: ['demo', 'product']
            }

        ]
        setMediaItems(initialMedia)
    }, [])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)

        try {
            const newMediaItems = await Promise.all(
                Array.from(files).map(async (file): Promise<MediaItem> => {
                    let width: number | undefined
                    let height: number | undefined
                    let type: MediaType = 'file'

                    if (file.type.startsWith('image/')) {
                        type = 'image'
                        const dimensions = await getImageDimensions(file)
                        width = dimensions.width
                        height = dimensions.height
                    } else if (file.type.startsWith('video/')) {
                        type = 'video'
                    }

                    return {
                        id: Date.now().toString(),
                        title: file.name,
                        type,
                        url: URL.createObjectURL(file),
                        thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
                        size: file.size,
                        uploadDate: new Date().toISOString(),
                        description: '',
                        tags: [],
                        width,
                        height
                    }
                })
            )

            setMediaItems(prev => [...prev, ...newMediaItems])

            toast({
                title: "Upload successful",
                description: `${files.length} file(s) have been uploaded.`,
            })
        } catch (error) {
            toast({
                title: "Upload failed",
                description: "There was an error uploading your files.",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleMediaUploaderUpload = (media: MediaItem[]) => {
        if (media.length > 0) {
            setMediaItems(prev => [...prev, ...media])
            toast({
                title: "Upload successful",
                description: `${media.length} file(s) have been uploaded.`,
            })
        }
        setShowUploadDialog(false)
    }

    const getImageDimensions = (file: File): Promise<{ width: number, height: number }> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                })
            }
            img.src = URL.createObjectURL(file)
        })
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const filteredMedia = React.useMemo(() => {
        return mediaItems.filter((item) => {
            const searchLower = searchQuery.toLowerCase()
            return (
                item.title.toLowerCase().includes(searchLower) ||
                (item.description && item.description.toLowerCase().includes(searchLower)) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            )
        })
    }, [mediaItems, searchQuery])

    const sortedMedia = React.useMemo(() => {
        return [...filteredMedia].sort((a, b) => {
            let comparison = 0

            if (sortBy === "date") {
                comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
            } else if (sortBy === "name") {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === "size") {
                comparison = a.size - b.size
            }

            return sortOrder === "asc" ? comparison : -comparison
        })
    }, [filteredMedia, sortBy, sortOrder])

    const totalPages = Math.ceil(sortedMedia.length / itemsPerPage)
    const paginatedMedia = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return sortedMedia.slice(startIndex, startIndex + itemsPerPage)
    }, [sortedMedia, currentPage, itemsPerPage])

    const handleMediaClick = (media: MediaItem) => {
        if (isDialog && onSelect) {
            onSelect(media)
        } else {
            setSelectedMedia(media.id === selectedMedia ? null : media.id)
        }
    }

    const handleViewDetails = (media: MediaItem, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedMediaDetails(media)
    }

    const handleDeleteClick = (media: MediaItem, e: React.MouseEvent) => {
        e.stopPropagation()
        setMediaToDelete(media)
    }

    const confirmDelete = () => {
        if (!mediaToDelete) return

        setMediaItems(prev => prev.filter(item => item.id !== mediaToDelete.id))
        setMediaToDelete(null)
        setSelectedMediaDetails(null)

        toast({
            title: "Media deleted",
            description: `${mediaToDelete.title} has been successfully deleted.`,
        })
    }

    const handleCopyLink = () => {
        if (!selectedMediaDetails) return

        navigator.clipboard.writeText(selectedMediaDetails.url)
        toast({
            title: "Link copied",
            description: "The media link has been copied to your clipboard.",
        })
    }

    const handleShare = async () => {
        if (!selectedMediaDetails) return

        try {
            await navigator.share({
                title: selectedMediaDetails.title,
                text: selectedMediaDetails.description || '',
                url: selectedMediaDetails.url,
            })
        } catch (err) {
            console.error('Error sharing:', err)
        }
    }

    const handleDownload = () => {
        if (!selectedMediaDetails) return

        const link = document.createElement('a')
        link.href = selectedMediaDetails.url
        link.download = selectedMediaDetails.title
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
            title: "Download started",
            description: `${selectedMediaDetails.title} is being downloaded.`,
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <div className={`flex flex-col h-full ${isDialog ? "p-0" : "p-6"}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*,video/*"
                className="hidden"
            />

            <Card className="flex flex-col sm:flex-row gap-4 mb-4 p-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search media..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontalIcon className="h-4 w-4 mr-1" />
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("date")}>
                                Date {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("name")}>
                                Name {sortBy === "name" && (sortOrder === "desc" ? "↓" : "↑")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("size")}>
                                Size {sortBy === "size" && (sortOrder === "desc" ? "↓" : "↑")}
                            </DropdownMenuItem>
                            <Separator className="my-2" />
                            <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                                {sortOrder === "asc" ? "Descending" : "Ascending"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="border rounded-md overflow-hidden flex">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            className="rounded-none"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid3X3Icon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            className="rounded-none"
                            onClick={() => setViewMode("list")}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    {isUploadButtonVisible && (
                        <>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => setShowUploadDialog(true)}
                                disabled={isUploading}
                                className="hidden sm:flex"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                {isUploading ? "Uploading..." : "Upload Files"}
                            </Button>

                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => setShowUploadDialog(true)}
                                disabled={isUploading}
                                className="sm:hidden"
                            >
                                <PlusIcon className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </div>
            </Card>

            <Card className="flex-1 overflow-hidden border rounded-md">
                <ScrollArea className="h-full">
                    {sortedMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <div className="rounded-full bg-muted p-3 mb-3">
                                <SearchIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">No media found</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {searchQuery ? "Try a different search term" : "Upload some media to get started"}
                            </p>
                            <div className="flex gap-2">

                                <Button variant="outline" onClick={() => setShowUploadDialog(true)}>
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Upload Files
                                </Button>
                            </div>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                            {paginatedMedia.map((media) => (
                                <div
                                    key={media.id}
                                    className={`group relative aspect-square rounded-md overflow-hidden border cursor-pointer transition-all hover:ring-2 hover:ring-primary ${selectedMedia === media.id ? "ring-2 ring-primary" : ""
                                        }`}
                                    onClick={() => handleMediaClick(media)}
                                >
                                    {media.type === "image" ? (
                                        <img
                                            src={media.url || "/placeholder.svg"}
                                            alt={media.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : media.type === "video" ? (
                                        <div className="h-full w-full bg-muted flex items-center justify-center">
                                            <video
                                                src={media.url}
                                                className="h-full w-full object-cover"
                                                poster={media.thumbnailUrl || "/placeholder.svg"}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-full w-full bg-muted flex items-center justify-center">
                                            <div className="text-2xl font-bold text-muted-foreground">
                                                {media.title.split(".").pop()?.toUpperCase()}
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-sm font-medium truncate">{media.title}</div>
                                        <div className="text-xs opacity-80">{formatDate(media.uploadDate)}</div>
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full w-8 h-8 p-0 bg-background/80 hover:bg-background"
                                            onClick={(e) => handleViewDetails(media, e)}
                                        >
                                            <InfoIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="rounded-full w-8 h-8 p-0"
                                            onClick={(e) => handleDeleteClick(media, e)}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y">
                            {paginatedMedia.map((media) => (
                                <div
                                    key={media.id}
                                    className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer ${selectedMedia === media.id ? "bg-muted" : ""
                                        }`}
                                    onClick={() => handleMediaClick(media)}
                                >
                                    <div className="h-12 w-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                                        {media.type === "image" ? (
                                            <img
                                                src={media.thumbnailUrl || media.url || "/placeholder.svg"}
                                                alt={media.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : media.type === "video" ? (
                                            <video
                                                src={media.url}
                                                className="h-full w-full object-cover"
                                                poster={media.thumbnailUrl || "/placeholder.svg"}
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-muted flex items-center justify-center">
                                                <div className="text-xs font-bold text-muted-foreground">
                                                    {media.title.split(".").pop()?.toUpperCase()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{media.title}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {formatDate(media.uploadDate)} • {formatFileSize(media.size)}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex gap-1">
                                        {media.tags?.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {media.tags && media.tags.length > 2 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{media.tags.length - 2}
                                            </Badge>
                                        )}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVerticalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => handleViewDetails(media, e)}>
                                                <InfoIcon className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleDownload}>
                                                <DownloadIcon className="mr-2 h-4 w-4" />
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleShare}>
                                                <Share2Icon className="mr-2 h-4 w-4" />
                                                Share
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleCopyLink}>
                                                <LinkIcon className="mr-2 h-4 w-4" />
                                                Copy Link
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={(e) => handleDeleteClick(media, e)}
                                            >
                                                <Trash2Icon className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </Card>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="px-4 py-2 text-sm font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            <Dialog open={!!mediaToDelete} onOpenChange={(open) => !open && setMediaToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Media</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{mediaToDelete?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setMediaToDelete(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {selectedMediaDetails && (
                <Sheet open={!!selectedMediaDetails} onOpenChange={(open) => !open && setSelectedMediaDetails(null)}>
                    <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>{selectedMediaDetails.title}</SheetTitle>
                            <SheetDescription>
                                Uploaded on {formatDate(selectedMediaDetails.uploadDate)}
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6">
                            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                                {selectedMediaDetails.type === "image" ? (
                                    <img
                                        src={selectedMediaDetails.url || "/placeholder.svg"}
                                        alt={selectedMediaDetails.title}
                                        className="object-contain max-h-[60vh]"
                                    />
                                ) : selectedMediaDetails.type === "video" ? (
                                    <video
                                        src={selectedMediaDetails.url}
                                        className="object-contain max-h-[60vh]"
                                        controls
                                        poster={selectedMediaDetails.thumbnailUrl || "/placeholder.svg"}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-8 text-center">
                                        <div className="text-4xl font-bold text-muted-foreground mb-2">
                                            {selectedMediaDetails.title.split(".").pop()?.toUpperCase()}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {formatFileSize(selectedMediaDetails.size)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleShare}>
                                            <Share2Icon className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Share</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleCopyLink}>
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy Link</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleDownload}>
                                            <DownloadIcon className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <StarIcon className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Add to favorites</TooltipContent>
                                </Tooltip>
                                <div className="flex-1" />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={(e) => {
                                                setSelectedMediaDetails(null)
                                                setMediaToDelete(selectedMediaDetails)
                                            }}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                                    <p className="mt-1 text-sm">
                                        {selectedMediaDetails.description || "No description available"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">File Information</h3>
                                    <div className="mt-1 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Type</p>
                                            <p>{selectedMediaDetails.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Size</p>
                                            <p>{formatFileSize(selectedMediaDetails.size)}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Dimensions</p>
                                            <p>
                                                {selectedMediaDetails.width && selectedMediaDetails.height
                                                    ? `${selectedMediaDetails.width} × ${selectedMediaDetails.height}`
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Upload Date</p>
                                            <p>{formatDate(selectedMediaDetails.uploadDate)}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedMediaDetails.tags && selectedMediaDetails.tags.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {selectedMediaDetails.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}

            {/* Media Uploader Dialog */}
            <MediaUploader
                isOpen={showUploadDialog}
                isEmbedded={false}
                onClose={() => setShowUploadDialog(false)}
                onUpload={handleMediaUploaderUpload}
            />
        </div>
    )
}