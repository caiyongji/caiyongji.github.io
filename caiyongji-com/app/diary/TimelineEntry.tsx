import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { JournalEntry } from './types'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface TimelineEntryProps {
  entry: JournalEntry
  showMonthSeparator?: boolean
}

export default function TimelineEntry({ entry, showMonthSeparator = false }: TimelineEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <>
      {showMonthSeparator && (
        <div className="flex w-full my-4">
          <div className="flex-shrink-0 w-12 mr-4"></div>
          <div className="flex-grow">
            <div className="text-lg font-semibold text-blue-500 dark:text-blue-400">
              {formatMonth(entry.date)}
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full">
        <div className="flex-shrink-0 w-12 flex flex-col items-center mr-4">
          <div className="w-3 h-3 bg-blue-500 dark:bg-blue-300 rounded-full"></div>
          <div className="w-0.5 flex-grow bg-blue-300 dark:bg-blue-400"></div>
        </div>
        <div className="flex-grow max-w-full overflow-hidden">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(entry.date)}</span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{entry.title}</h2>
            <div className={`text-gray-700 dark:text-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-full' : 'max-h-24'}`}>
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    const code = String(children).replace(/\n$/, '')
                    return !inline && match ? (
                      <div className="relative group">
                        <button 
                          onClick={() => handleCopy(code)} 
                          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={isCopied ? "Copied!" : "Copy code"}
                        >
                          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <SyntaxHighlighter
                          style={isDark ? oneDark : oneLight}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.375rem',
                            padding: '1rem',
                          }}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={`${className} bg-gray-100 dark:bg-gray-700`} {...props}>
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
    </>
  )
}