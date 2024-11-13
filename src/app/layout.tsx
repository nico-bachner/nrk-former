import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'NRK Former',
  description: 'Optimal solver for NRK Former',
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
)

export default Layout
