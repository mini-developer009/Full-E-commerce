'use client'
import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const LoadingProgressBar = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <ProgressBar
                height="4px"
                color="hsl(var(--primary))"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {
                children
            }
        </div>
    )
}