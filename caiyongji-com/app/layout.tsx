import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from './components/Navigation'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Cai Yongji - All about AI, Self Improvement, Startup, and Personal Growth.",
  description: "Hi, I'm Cai, an indie developer exploring AI-powered entrepreneurship. I'm taking a Build in Public approach, focusing on AI, Self Improvement, Startup, and Personal Growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} text-[rgb(20,20,20)] dark:text-gray-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="bg-white dark:bg-[rgb(20,20,20)] min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
