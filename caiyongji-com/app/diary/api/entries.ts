import { JournalEntry, MonthlyOverview } from '../types'

export const fetchJournalEntries = async (year: number, page: number, limit: number): Promise<{
  entries: JournalEntry[];
  totalEntries: number;
  currentPage: number;
  totalPages: number;
}> => {
  const response = await fetch(`/api/diary/entries?year=${year}&page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch journal entries')
  }
  return response.json()
}

export const fetchMonthlyOverview = async (year: number): Promise<MonthlyOverview[]> => {
  const response = await fetch(`/api/diary/monthly-overview?year=${year}`)
  if (!response.ok) {
    throw new Error('Failed to fetch monthly overview')
  }
  return response.json()
}

export const fetchAvailableYears = async (): Promise<number[]> => {
  const response = await fetch('/api/diary/available-years')
  if (!response.ok) {
    throw new Error('Failed to fetch available years')
  }
  return response.json()
}