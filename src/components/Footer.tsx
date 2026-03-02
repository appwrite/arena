export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-10 border-t border-[var(--line)] px-4 pb-6 pt-6 text-[var(--text-secondary)]">
			<p className="m-0 text-center text-sm">
				ⓒ {year} Appwrite. All rights reserved.
			</p>
		</footer>
	);
}
