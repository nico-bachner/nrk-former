import type { Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: 'NRK Former',
  description: 'Optimal solver for NRK Former',
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body className="bg-violet-950 antialiased">{children}</body>
  </html>
)

export default Layout
