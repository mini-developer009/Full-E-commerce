'use client'

import React from 'react'

interface OnePageDialogProps {
    url: string
    title?: string
    width?: number
    height?: number
    children?: React.ReactNode
}

const OnePageDialog: React.FC<OnePageDialogProps> = ({
    url,
    title = 'Popup',
    width = 800,
    height = 600,
    children,
}) => {
    const openPopup = () => {
        const left = window.screenX + (window.outerWidth - width) / 2
        const top = window.screenY + (window.outerHeight - height) / 2
        window.open(
            url,
            title,
            `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`
        )
    }

    return (
        <span onClick={openPopup} style={{ cursor: 'pointer' }}>
            {children}
        </span>
    )
}

export default OnePageDialog
