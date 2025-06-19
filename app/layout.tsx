import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ayush_Aumnee',
  description: 'Assignment Project for Ayush Aumnee',
  generator: 'Ayush Aumnee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
