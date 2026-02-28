import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { BenchmarkResults } from '#/lib/types'
import LeaderboardTabs from '#/components/LeaderboardTabs'
import LeaderboardTable from '#/components/LeaderboardTable'
import withGuidelinesData from '#/data/results-with-guidelines.json'
import withoutGuidelinesData from '#/data/results-without-guidelines.json'

const withGuidelines = withGuidelinesData as BenchmarkResults
const withoutGuidelines = withoutGuidelinesData as BenchmarkResults

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [activeTab, setActiveTab] = useState<'with-guidelines' | 'without-guidelines'>('with-guidelines')
  const activeData = activeTab === 'with-guidelines' ? withGuidelines : withoutGuidelines

  return (
    <main className="arena-container px-4 pb-0 pt-14">
      <section className="rise-in mb-6 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          <span className="text-[var(--accent-pink)]">
            Appwrite Arena
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
          Benchmarking AI models on their knowledge of Appwrite services.
          See how well LLMs understand Appwrite — with and without guideline context.
        </p>
      </section>

      <section className="rise-in" style={{ animationDelay: '100ms' }}>
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeData.runDate && (
            <p className="text-xs text-[var(--text-secondary)]">
              Last updated: {new Date(activeData.runDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <LeaderboardTable data={activeData} />
      </section>
    </main>
  )
}
