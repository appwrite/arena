# Appwrite Arena

LLM benchmarking leaderboard that evaluates how well AI models understand [Appwrite](https://appwrite.io) services. Compare model performance with and without skill file context across 70 questions spanning 7 Appwrite product categories.

Live at **[arena.appwrite.network](https://arena.appwrite.network)**

## How It Works

The benchmark tests leading AI models on their knowledge of Appwrite through two modes:

- **With skills** — Models receive comprehensive Appwrite documentation as context
- **Without skills** — Models answer based solely on their training data

Questions are split into **57 multiple-choice** (auto-scored) and **13 free-form** (AI-judged by Claude Sonnet 4.6) across these categories:

| Category | Topics |
|---|---|
| Foundation | Core Appwrite concepts and architecture |
| Auth | Authentication, users, teams, OAuth |
| Databases | Collections, documents, queries, permissions |
| Functions | Serverless functions, runtimes, triggers |
| Storage | File uploads, buckets, previews |
| Sites | Web hosting and deployment |
| Messaging | Email, SMS, push notifications |

### Models Tested

- **Claude Opus 4.6** — Anthropic
- **GPT 5.3 Codex** — OpenAI
- **Gemini 3.1 Pro (Preview)** — Google

All models are accessed via [OpenRouter](https://openrouter.ai) with temperature set to 0 for deterministic results.

## Tech Stack

**Frontend:** React, TanStack Start, Tailwind CSS, Vite, TypeScript

**Benchmark:** Bun, OpenRouter

## Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh) (for benchmark scripts and pre-build step)

### Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

### Linting & Formatting

```bash
npm run lint
npm run format
npm run check
```

### Tests

```bash
npm run test
```

## Running Benchmarks

The benchmark suite lives in the `benchmark/` directory and requires an [OpenRouter API key](https://openrouter.ai/keys).

```bash
cd benchmark
cp .env.example .env
# Fill in your API key in .env

# Run both modes
bun run bench:all

# Or run individually
bun run bench:with-skills
bun run bench:without-skills
```

Keep in mind, the benchmark only fills missing data in result JSON files, to minimize cost. If you intend to re-run the benchmark on existing results, you should delete the contents of the JSON files first.

Results are saved to `src/data/results-with-skills.json` and `src/data/results-without-skills.json`, which the frontend reads at build time.

## Project Structure

```
├── src/                    # Frontend application
│   ├── components/         # React UI components
│   ├── routes/             # File-based routes (TanStack Router)
│   ├── data/               # Static benchmark result JSON files
│   └── lib/                # Types, utilities, site config
├── benchmark/              # Benchmark suite
│   ├── src/
│   │   ├── questions/      # 70 questions across 7 categories
│   │   ├── skills/         # Appwrite documentation for context mode
│   │   ├── runner.ts       # Test execution logic
│   │   ├── judge.ts        # AI judge for free-form answers
│   │   └── config.ts       # Model definitions and settings
│   └── package.json
├── scripts/                # Build-time scripts (GitHub stars fetcher)
└── public/                 # Static assets
```

## License

MIT — see [LICENSE](LICENSE).
