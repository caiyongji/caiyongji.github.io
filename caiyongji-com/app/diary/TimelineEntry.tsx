import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { JournalEntry } from './types'

interface TimelineEntryProps {
  entry: JournalEntry
}

export default function TimelineEntry({ entry }: TimelineEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="w-0.5 h-full bg-blue-300"></div>
      </div>
      <div className="flex-grow">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-700"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
          <p className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {entry.content}
          </p>
        </div>
      </div>
    </div>
  )
}