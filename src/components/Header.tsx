import ThemeToggle from './ThemeToggle'

function AppwriteLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 112 98" fill="none">
      <path d="M111.1 73.4729V97.9638H48.8706C30.7406 97.9638 14.9105 88.114 6.44112 73.4729C5.2099 71.3444 4.13229 69.1113 3.22835 66.7935C1.45387 62.2516 0.338421 57.3779 0 52.2926V45.6712C0.0734729 44.5379 0.189248 43.4135 0.340647 42.3025C0.650124 40.0227 1.11768 37.7918 1.73218 35.6232C7.54544 15.0641 26.448 0 48.8706 0C71.2932 0 90.1935 15.0641 96.0068 35.6232H69.3985C65.0302 28.9216 57.4692 24.491 48.8706 24.491C40.272 24.491 32.711 28.9216 28.3427 35.6232C27.0113 37.6604 25.9782 39.9069 25.3014 42.3025C24.7002 44.4266 24.3796 46.6664 24.3796 48.9819C24.3796 56.0019 27.3319 62.3295 32.0653 66.7935C36.4515 70.9369 42.3649 73.4729 48.8706 73.4729H111.1Z" fill="#FD366E"/>
      <path d="M111.1 42.3027V66.7937H65.6759C70.4094 62.3297 73.3616 56.0021 73.3616 48.9821C73.3616 46.6666 73.041 44.4268 72.4399 42.3027H111.1Z" fill="#FD366E"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" width="18" height="18" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="arena-container flex items-center py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 text-[var(--text-primary)] no-underline"
        >
          <AppwriteLogo />
          <span className="text-[var(--text-primary)] text-xl font-semibold tracking-tight">Benchmark</span>
        </a>

        <div className="ml-auto flex items-center gap-4">
          <a
            href="https://github.com/appwrite"
            target="_blank"
            rel="noreferrer"
            className="block text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <span className="sr-only">GitHub</span>
            <GitHubIcon />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
