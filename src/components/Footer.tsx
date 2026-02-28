export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--text-secondary)]">
      <div className="arena-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} Matej "Meldiron" Bačo. All rights reserved.
        </p>
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Built with Appwrite Arena Benchmark
        </p>
      </div>
    </footer>
  )
}
