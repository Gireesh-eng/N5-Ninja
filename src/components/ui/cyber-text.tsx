import React from 'react'

type CyberVariant = 'cyan' | 'green' | 'blue' | 'purple' | 'pink' | 'yellow'
type AnimationType = 'static' | 'pulse' | 'flicker'

interface CyberTextProps {
  children: React.ReactNode
  variant?: CyberVariant
  animation?: AnimationType
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

const variantMap: Record<CyberVariant, string> = {
  cyan: 'text-cyber-cyan',
  green: 'text-cyber-green',
  blue: 'text-cyber-blue',
  purple: 'text-cyber-purple',
  pink: 'text-cyber-pink',
  yellow: 'text-cyber-yellow'
}

const animationMap: Record<AnimationType, string> = {
  static: '',
  pulse: 'text-cyber-pulse',
  flicker: 'text-cyber-flicker'
}

const CyberText = ({ 
  children, 
  variant = 'cyan', 
  animation = 'static',
  className = '',
  tag: Tag = 'span'
}: CyberTextProps) => {
  const variantClass = variantMap[variant] || variantMap.cyan
  const animationClass = animationMap[animation] || ''
  
  return (
    <Tag className={`${variantClass} ${animationClass} ${className}`}>
      {children}
    </Tag>
  )
}

export default CyberText