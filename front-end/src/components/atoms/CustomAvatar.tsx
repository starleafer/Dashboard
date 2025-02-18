import React from 'react'
import { Avatar } from '@adobe/react-spectrum'

interface CustomAvatarProps {
    src: string | null
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
}

const CustomAvatar = ({src, size = 'md', onClick}: CustomAvatarProps) => {
  const dimensions = {
    sm: { size: "75" },
    md: { size: "100" }, 
    lg: { size: "125" }
  }[size]

  return onClick ? (
    <button onClick={onClick} className="cursor-pointer w-14 h-14">
      <Avatar src={src || ''} alt={src || ''} {...dimensions} />
    </button>
  ) : (
    <Avatar src={src || ''} alt={src || ''} {...dimensions} />
  )
}

export default CustomAvatar