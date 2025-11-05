"use client"

import { useCallback, useEffect, useState } from "react"

export type FetchedDataType<T> = {
  data: null | T
  err: null | unknown
  fetchData: () => Promise<void>
  isLoading: boolean
}

const useFetchFn = <T>(fn: () => Promise<T>): FetchedDataType<T> => {
  const [data, setData] = useState<null | T>(null)
  const [err, setErr] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)

      const data = await fn()

      setData(data)
      setIsLoading(false)
    } catch (error) {
      setErr(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [fn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, err, fetchData, isLoading }
}

export default useFetchFn
