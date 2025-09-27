import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SupplierCreatePage from '../add/page'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'


const CreateSuppliers = () => {
    const t = useTranslations('global')
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>{t('add-new', {
                    title: t('suppliers')
                })}</Button>
            </SheetTrigger>
            <SheetContent className="p-0 min-w-[50%]">
                <SupplierCreatePage />
            </SheetContent>
        </Sheet>

    )
}

export default CreateSuppliers