import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '5') // 修改默认值为5

  const currentYear = new Date().getFullYear()
  if (year > currentYear) {
    return NextResponse.json([])
  }

  const diaryDir = path.join(process.cwd(), 'data', 'diary', year.toString())
  
  try {
    const files = await fs.readdir(diaryDir)

    const entries = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const filePath = path.join(diaryDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const { content: markdown } = matter(content)
          const lines = markdown.split('\n')
          const title = lines[0].replace(/^#\s*/, '').trim()
          const entryContent = lines.slice(1).join('\n').trim()
          return {
            id: parseInt(file.slice(0, 8)),
            date: `${file.slice(0, 4)}-${file.slice(4, 6)}-${file.slice(6, 8)}`,
            title: title || 'Untitled',
            content: entryContent
          }
        })
    )

    const sortedEntries = entries.sort((a, b) => b.id - a.id)
    const startIndex = (page - 1) * limit
    const paginatedEntries = sortedEntries.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      entries: paginatedEntries,
      totalEntries: sortedEntries.length,
      currentPage: page,
      totalPages: Math.ceil(sortedEntries.length / limit)
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ entries: [], totalEntries: 0, currentPage: 1, totalPages: 0 })
  }
}