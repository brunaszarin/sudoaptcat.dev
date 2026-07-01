import { PixelButton } from '@/components/ui/PixelButton'

export default function Home() {
  return (
    <main style={{ display: 'flex', gap: '20px', padding: '4rem', flexWrap: 'wrap' }}>
      <PixelButton variant="green">my work</PixelButton>
      <PixelButton variant="pink">start</PixelButton>
      <PixelButton variant="ghost">about me</PixelButton>
    </main>
  )
}
