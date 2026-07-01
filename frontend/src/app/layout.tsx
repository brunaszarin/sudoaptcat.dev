import type { Metadata } from 'next'
import { Pixelify_Sans, Bricolage_Grotesque } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const pixelFont = Pixelify_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'bruna szarin | fullstack dev',
  description: 'portfolio — pixel art, código e café',
  openGraph: {
    title: 'bruna szarin | fullstack dev',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}