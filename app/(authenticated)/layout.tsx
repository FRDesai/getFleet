'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true)
  const sidebarMargin = collapsed ? 'ml-16' : 'ml-44'

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className={`flex flex-col ${sidebarMargin} transition-all duration-300 flex-1`}>
        <Navbar collapsed={collapsed} />
        <main className="pt-16 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
