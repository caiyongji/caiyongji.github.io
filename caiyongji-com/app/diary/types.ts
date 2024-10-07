export interface JournalEntry {
  id: number;
  date: string;
  title: string;
  content: string;
}

export interface MonthlyOverview {
  month: number;
  count: number;
}