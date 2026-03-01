import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterChipOption {
	value: string;
	label: string;
}

interface FilterChipProps {
	label: string;
	value: string;
	options: FilterChipOption[];
	onChange: (value: string) => void;
}

export default function FilterChip({
	label,
	value,
	options,
	onChange,
}: FilterChipProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	const activeLabel = options.find((o) => o.value === value)?.label ?? value;

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs transition hover:border-[var(--line)]"
			>
				<span className="text-[var(--text-secondary)]">{label}</span>
				<span className="font-medium text-[var(--text-primary)]">
					{activeLabel}
				</span>
				<ChevronDown
					size={12}
					className={`text-[var(--text-secondary)] transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{open && (
				<div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] py-1 shadow-lg">
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
							className={`block w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs transition hover:bg-[var(--link-bg-hover)] ${
								option.value === value
									? "font-medium text-[var(--text-primary)]"
									: "text-[var(--text-secondary)]"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
