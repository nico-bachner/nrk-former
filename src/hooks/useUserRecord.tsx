'use client'

import { useEffect, useState } from 'react'

export const useUserRecord = () => {
  const [userRecord, setUserRecord] = useState<number | undefined>(undefined)

  useEffect(() => {
    const record = localStorage.getItem('record')

    if (record) {
      setUserRecord(parseInt(record))
    }
  }, [])

  return { userRecord, setUserRecord }
}
