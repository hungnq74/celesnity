import type { Metadata } from 'next'
import HomePage from '@/app/page'

export const metadata: Metadata = {
  title: 'Celesnity — Blueprint artwork study',
  description: 'An alternate visual study for the Celesnity flagship landing page.',
  alternates: { canonical: '/blueprint' },
  robots: { index: false, follow: false },
}

export default function BlueprintPage() {
  return (
    <div className="blueprint-theme">
      <HomePage />
    </div>
  )
}
