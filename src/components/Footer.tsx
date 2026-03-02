export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-[var(--line)] px-4 pb-8 pt-8">
			<div className="arena-container flex flex-col items-center gap-4 md:flex-row md:justify-between">
				<nav
					className="flex flex-wrap items-center justify-center gap-6 text-sm"
					aria-label="Footer navigation"
				>
					<a
						href="/#leaderboard"
						className="font-medium text-[var(--text-secondary)] no-underline transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					>
						Leaderboard
					</a>
					<a
						href="/#methodology"
						className="font-medium text-[var(--text-secondary)] no-underline transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					>
						Methodology
					</a>
					<a
						href="https://github.com/appwrite/arena"
						target="_blank"
						rel="noreferrer"
						className="font-medium text-[var(--text-secondary)] no-underline transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					>
						GitHub
					</a>
					<a
						href="https://appwrite.io"
						target="_blank"
						rel="noreferrer"
						className="font-medium text-[var(--text-secondary)] no-underline transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					>
						Appwrite
					</a>
				</nav>
				<p className="m-0 text-sm text-[var(--text-secondary)]">
					© {year} Appwrite. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
