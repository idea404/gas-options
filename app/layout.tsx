import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nil Client Web Interface',
  description: 'Web interface for interacting with nil client',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
