import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { JournalEntry } from './types'
import Image from 'next/image'

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
      <div className="w-full">
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
          <div className={`text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-full' : 'max-h-24'}`}>
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                        customStyle={{
                          margin: 0,
                          padding: '1em',
                          fontSize: '0.9em',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                img({src, alt}) {
                  const imageSrc = src?.startsWith('/') ? src : `/${src}`
                  return (
                    <div className="relative w-full h-64">
                      <Image
                        src={imageSrc}
                        alt={alt || ''}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )
                }
              }}
              className="markdown-content"
            >
              {entry.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}