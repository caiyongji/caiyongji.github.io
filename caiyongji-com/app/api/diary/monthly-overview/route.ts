import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())

  const currentYear = new Date().getFullYear()
  if (year > currentYear) {
    return NextResponse.json([])
  }

  const diaryDir = path.join(process.cwd(), 'data', 'diary', year.toString())

  const monthlyOverview = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    count: 0
  }))

  try {
    const files = await fs.readdir(diaryDir)

    files
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const month = parseInt(file.slice(4, 6)) - 1
        monthlyOverview[month].count++
      })

    return NextResponse.json(monthlyOverview)
  } catch (error) {
    console.error(error)
    return NextResponse.json(monthlyOverview)
  }
}