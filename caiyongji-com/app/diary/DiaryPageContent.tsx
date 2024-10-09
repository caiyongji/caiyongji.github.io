'use client';

import { useState, useEffect, useCallback } from 'react'
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

  const ITEMS_PER_PAGE = 5;

  const loadMore = useCallback(async (reset = false) => {
    if (isLoading) return
    setIsLoading(true)
    const currentPage = reset ? 1 : page
    try {
      const response = await fetchJournalEntries(year, currentPage, ITEMS_PER_PAGE)
      if (response.entries.length === 0) {
        setHasMore(false)
      } else {
        setEntries(prev => reset ? response.entries : [...prev, ...response.entries])
        setPage(prev => prev + 1)
        setHasMore(currentPage < response.totalPages)
      }
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, page, year])

  const loadMonthlyOverview = useCallback(async () => {
    try {
      const overview = await fetchMonthlyOverview(year)
      setMonthlyOverview(overview)
    } catch (error) {
      console.error('Error loading monthly overview:', error)
    }
  }, [year])

  useEffect(() => {
    setPage(1)
    setEntries([])
    setHasMore(true)
    loadMore(true)
    loadMonthlyOverview()
  }, [year, loadMore, loadMonthlyOverview])

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore()
    }
  }, [inView, hasMore, isLoading, loadMore])

  const changeYear = (increment: number) => {
    const newYear = year + increment
    if (newYear <= currentYear && newYear > 0) {
      setYear(newYear)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Cai&apos;s Start Up Journal</h1>

      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeYear(-1)} className="btn btn-primary">
          <ChevronLeft />
        </button>
        <h2 className="text-2xl font-semibold">{year}</h2>
        <button onClick={() => changeYear(1)} className="btn btn-primary" disabled={year === currentYear}>
          <ChevronRight />
        </button>
      </div>
      <MonthlyOverview overview={monthlyOverview} />
      <div className="space-y-8">
        {entries.map((entry, index) => {
          const currentMonth = new Date(entry.date).getMonth()
          const prevMonth = index > 0 ? new Date(entries[index - 1].date).getMonth() : null
          const showMonthSeparator = index === 0 || currentMonth !== prevMonth

          return (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              showMonthSeparator={showMonthSeparator}
            />
          )
        })}
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center mt-8">
          {isLoading ? (
            <p>Loading more entries...</p>
          ) : (
            <button onClick={() => loadMore()} className="btn btn-primary">
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  )
}