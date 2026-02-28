import githubStars from "#/data/github-stars.json";
import ThemeToggle from "./ThemeToggle";

function AppwriteLogo() {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="21"
			viewBox="0 0 112 98"
			fill="none"
		>
			<path
				d="M111.1 73.4729V97.9638H48.8706C30.7406 97.9638 14.9105 88.114 6.44112 73.4729C5.2099 71.3444 4.13229 69.1113 3.22835 66.7935C1.45387 62.2516 0.338421 57.3779 0 52.2926V45.6712C0.0734729 44.5379 0.189248 43.4135 0.340647 42.3025C0.650124 40.0227 1.11768 37.7918 1.73218 35.6232C7.54544 15.0641 26.448 0 48.8706 0C71.2932 0 90.1935 15.0641 96.0068 35.6232H69.3985C65.0302 28.9216 57.4692 24.491 48.8706 24.491C40.272 24.491 32.711 28.9216 28.3427 35.6232C27.0113 37.6604 25.9782 39.9069 25.3014 42.3025C24.7002 44.4266 24.3796 46.6664 24.3796 48.9819C24.3796 56.0019 27.3319 62.3295 32.0653 66.7935C36.4515 70.9369 42.3649 73.4729 48.8706 73.4729H111.1Z"
				fill="#FD366E"
			/>
			<path
				d="M111.1 42.3027V66.7937H65.6759C70.4094 62.3297 73.3616 56.0021 73.3616 48.9821C73.3616 46.6666 73.041 44.4268 72.4399 42.3027H111.1Z"
				fill="#FD366E"
			/>
		</svg>
	);
}

function StarIcon() {
	return (
		<svg
			aria-hidden="true"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}

function formatStars(count: number): string {
	if (count >= 1000) {
		const k = count / 1000;
		return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
	}
	return String(count);
}

export default function Header() {
	const stars = githubStars.stars;

	return (
		<header className="sticky top-0 z-50 bg-[var(--header-bg)] px-4 backdrop-blur-lg">
			<nav className="arena-container flex items-center py-4">
				<a
					href="/"
					className="inline-flex items-center gap-2.5 text-[var(--text-primary)] no-underline"
				>
					<AppwriteLogo />
					<span className="text-[var(--text-primary)] text-xl font-semibold tracking-tight">
						Benchmark
					</span>
				</a>

				<div className="ml-auto flex items-center gap-2">
					<a
						href="https://github.com/meldiron/appwrite-arena"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-1.5 pl-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
					>
						<StarIcon />
						<span>Star on GitHub</span>
						<span
							className="rounded-md px-2 py-0.5 text-xs font-semibold text-[var(--text-secondary)]"
							style={{ background: "var(--line)" }}
						>
							{formatStars(stars)}
						</span>
					</a>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
