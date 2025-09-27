'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from './ui/button'
import { Printer } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface PrintWrapperProps {
    children: React.ReactNode
    printTitle?: string
    preview?: boolean
}

const PrintWrapper: React.FC<PrintWrapperProps> = ({
    children,
    printTitle = 'Document',
    preview = true,
}) => {
    const printRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: printTitle,
    } as any)

    const t = useTranslations('global')


    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    onClick={handlePrint}
                >
                    <Printer size={20} /> <span className='hidden md:flex'>{t('print')}</span>
                </Button>
            </div>

            <div style={{
                position: preview ? 'static' : 'absolute',
                left: preview ? 'auto' : '-9999px',
                top: preview ? 'auto' : '-9999px',
            }}>
                <div
                    ref={printRef}

                >
                    {children}
                </div>
            </div>

        </div>
    )
}

export default PrintWrapper
