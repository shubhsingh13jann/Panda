import './globals.css'
import './cake-gift.css'
import { Playfair_Display, Dancing_Script, Lato } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
})

export const metadata = {
  title: 'Happy Birthday Gg🐼 🎋',
  description: 'A special birthday celebration for my dearest big sister (Panda)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dancing.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  )
}
