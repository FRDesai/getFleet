'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

type InputProps = {
  placeholder: string
  icon?: React.ReactNode
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, icon, type = 'text', value, onChange }) => {
  return (
    <div className="flex items-center border rounded-md bg-gray-100 px-3 py-2">
      {icon && <span className="mr-2 text-gray-500">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-100 outline-none w-full text-sm"
      />
    </div>
  )
}

export default Input
