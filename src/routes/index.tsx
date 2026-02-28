import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { BenchmarkResults, ScoringMode } from '#/lib/types'
import LeaderboardTabs from '#/components/LeaderboardTabs'
import LeaderboardTable from '#/components/LeaderboardTable'
import ScoringModeToggle from '#/components/ScoringModeToggle'
import withGuidelinesData from '#/data/results-with-guidelines.json'
import withoutGuidelinesData from '#/data/results-without-guidelines.json'

const withGuidelines = withGuidelinesData as BenchmarkResults
const withoutGuidelines = withoutGuidelinesData as BenchmarkResults

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [activeTab, setActiveTab] = useState<'with-guidelines' | 'without-guidelines'>('with-guidelines')
  const [scoringMode, setScoringMode] = useState<ScoringMode>('all')
  const activeData = activeTab === 'with-guidelines' ? withGuidelines : withoutGuidelines

  return (
    <main className="arena-container px-4 pb-0 pt-14">
      <section className="rise-in mb-6 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Appwrite Arena
        </h1>
        <p className="mx-auto max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
          Benchmarking AI models on their knowledge of Appwrite services.
          See how well LLMs understand Appwrite — with and without guideline context.
        </p>
      </section>

      <section className="rise-in" style={{ animationDelay: '100ms' }}>
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap justify-between items-center gap-3 w-full">
            <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <ScoringModeToggle
              active={scoringMode}
              onChange={setScoringMode}
              totalQuestions={activeData.totalQuestions ?? 70}
              totalMcq={activeData.totalMcq ?? 57}
              totalFreeform={activeData.totalFreeform ?? 13}
            />
          </div>
        </div>

        <LeaderboardTable data={activeData} scoringMode={scoringMode} />

        {activeData.runDate && (
          <p className="text-center mt-2 text-xs text-[var(--text-secondary)]">
            Last updated on {new Date(activeData.runDate).toLocaleDateString()}
          </p>
        )}
        
        <p className="mt-4 text-xs text-center max-w-3xl mx-auto text-[var(--text-secondary)]">
          Scores combine multiple-choice questions (auto-scored) and free-form questions
          (judged by Claude Sonnet 4.6 via OpenRouter). Free-form answers receive partial
          credit on a 0–1 scale, which is why some categories may not be exactly 0% or 100%.
        </p>
        
       
      </section>
    </main>
  )
}
