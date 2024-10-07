'use client';

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import MonthlyOverview from './MonthlyOverview'
import TimelineEntry from './TimelineEntry'
import { fetchJournalEntries, fetchMonthlyOverview } from './api/entries'
import { JournalEntry, MonthlyOverview as MonthlyOverviewType } from './types'

export default function DiaryPage() {
  const currentYear = new Date().getFullYear()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [monthlyOverview, setMonthlyOverview] = useState<MonthlyOverviewType[]>([])
  const [year, setYear] = useState(currentYear)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => {
    setPage(1)
    setEntries([])
    setHasMore(true)
    loadMore(true)
    loadMonthlyOverview()
  }, [year])

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore()
    }
  }, [inView, hasMore, isLoading])

  const loadMore = async (reset = false) => {
    if (isLoading) return
    setIsLoading(true)
    const currentPage = reset ? 1 : page
    const response = await fetchJournalEntries(year, currentPage, 10)
    setIsLoading(false)
    if (response.entries.length === 0) {
      setHasMore(false)
    } else {
      setEntries(prev => reset ? response.entries : [...prev, ...response.entries])
      setPage(prev => prev + 1)
      setHasMore(currentPage < response.totalPages)
    }
  }

  const loadMonthlyOverview = async () => {
    const overview = await fetchMonthlyOverview(year)
    setMonthlyOverview(overview)
  }

  const changeYear = (increment: number) => {
    const newYear = year + increment
    if (newYear <= currentYear && newYear > 0) {
      setYear(newYear)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Startup Journal</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeYear(-1)} className="p-2" disabled={year <= 1}>
          <ChevronLeft />
        </button>
        <span className="text-xl font-semibold">{year}</span>
        <button onClick={() => changeYear(1)} className="p-2" disabled={year >= currentYear}>
          <ChevronRight />
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Monthly Overview</h2>
      <MonthlyOverview overview={monthlyOverview} />

      <h2 className="text-2xl font-semibold my-4">All Entries</h2>
      <div className="space-y-8">
        {entries.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>
      {hasMore && <div ref={ref} className="h-10" />}
      {isLoading && <div className="text-center">Loading...</div>}
    </div>
  )
}