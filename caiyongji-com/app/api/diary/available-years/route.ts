import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const diaryDir = path.join(process.cwd(), 'data', 'diary')
  
  try {
    const years = await fs.readdir(diaryDir)
    const availableYears = years
      .filter(year => /^\d{4}$/.test(year))
      .map(year => parseInt(year))
      .sort((a, b) => b - a)

    return NextResponse.json(availableYears)
  } catch (error) {
    console.error(error)
    return NextResponse.json([])
  }
}