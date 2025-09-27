'use client'

import React from 'react'
import { getIconComponent } from './IconDialig/GetIReactIcon'

interface IconRendererProps {
  iconName: string
  size?: number
  className?: string
}

const FallbackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`text-gray-500 ${className}`}>No Icon</div>
)

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, size = 40, className = '' }) => {
  const IconComponent = getIconComponent(iconName) || FallbackIcon
  return <IconComponent size={size} className={className} />
}

export default IconRenderer
