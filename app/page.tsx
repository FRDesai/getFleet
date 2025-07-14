'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  console.log("It is here is page.tsc")
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/check-session', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        console.log("This is the data",data)
        if (data.isAuthenticated) {
          router.replace('/dashboard')
        } else {
          router.replace('/login')
        }
      } catch (err) {
        console.log("This is an err", err)
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  return null
}
