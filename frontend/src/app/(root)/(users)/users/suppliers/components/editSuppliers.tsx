import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SuppliereditPage from '../edit/[slug]/page'
import { Button } from '@/components/ui/button'


const EditSuppliers = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                    Edit
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0 min-w-[50%]">
                <SuppliereditPage />
            </SheetContent>
        </Sheet>

    )
}

export default EditSuppliers