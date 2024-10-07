import { MonthlyOverview as MonthlyOverviewType } from './types'

interface MonthlyOverviewProps {
  overview: MonthlyOverviewType[]
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function MonthlyOverview({ overview }: MonthlyOverviewProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {overview.map(({ month, count }) => (
        <div key={month} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">{monthNames[month - 1]}</h3>
          <p className="text-gray-700 dark:text-gray-300">{count} {count === 1 ? 'entry' : 'entries'}</p>
        </div>
      ))}
    </div>
  )
}