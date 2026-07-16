import type { Metadata } from 'next'
import { Pixelify_Sans, Bricolage_Grotesque } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/navbar'
import './globals.css'

const pixelFont = Pixelify_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-pixelify',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'bruna szarin | fullstack dev',
  description: 'portfolio — pixel art, código e café',
  openGraph: {
    title: 'sudo apt cat | software engineer ',
    description: 'portfolio — pixel art, código e café',
    url: 'https://brunaszarin.dev',
    siteName: 'brunaszarin.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${pixelFont.variable} ${bricolage.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}