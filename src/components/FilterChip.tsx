import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterChipOption {
	value: string;
	label: string;
}

interface SingleSelectProps {
	label: string;
	options: FilterChipOption[];
	value: string;
	onChange: (value: string) => void;
	multi?: false;
	multiValue?: never;
	onMultiChange?: never;
}

interface MultiSelectProps {
	label: string;
	options: FilterChipOption[];
	multi: true;
	multiValue: string[];
	onMultiChange: (values: string[]) => void;
	value?: never;
	onChange?: never;
}

type FilterChipProps = SingleSelectProps | MultiSelectProps;

export default function FilterChip(props: FilterChipProps) {
	const { label, options, multi } = props;
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

	let activeLabel: string;
	if (multi) {
		const selected = props.multiValue;
		if (selected.length === options.length) {
			activeLabel = "All";
		} else if (selected.length === 0) {
			activeLabel = "None";
		} else if (selected.length === 1) {
			activeLabel =
				options.find((o) => o.value === selected[0])?.label ?? selected[0];
		} else {
			activeLabel = `${selected.length} selected`;
		}
	} else {
		activeLabel =
			options.find((o) => o.value === props.value)?.label ?? props.value;
	}

	function handleOptionClick(optionValue: string) {
		if (multi) {
			const current = props.multiValue;
			if (current.includes(optionValue)) {
				props.onMultiChange(current.filter((v) => v !== optionValue));
			} else {
				props.onMultiChange([...current, optionValue]);
			}
		} else {
			props.onChange(optionValue);
			setOpen(false);
		}
	}

	function isSelected(optionValue: string): boolean {
		if (multi) {
			return props.multiValue.includes(optionValue);
		}
		return props.value === optionValue;
	}

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
				<div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-base)] py-1 shadow-lg">
					{multi && (
						<button
							type="button"
							onClick={() => {
								const allSelected = props.multiValue.length === options.length;
								props.onMultiChange(
									allSelected ? [] : options.map((o) => o.value),
								);
							}}
							className="block w-full cursor-pointer border-none border-b border-b-[var(--line)] bg-transparent px-3 py-1.5 text-left text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--text-primary)]"
						>
							{props.multiValue.length === options.length
								? "Unselect all"
								: "Select all"}
						</button>
					)}
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleOptionClick(option.value)}
							className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-3 py-1.5 text-left text-xs transition hover:bg-[var(--link-bg-hover)] ${
								isSelected(option.value)
									? "font-medium text-[var(--text-primary)]"
									: "text-[var(--text-secondary)]"
							}`}
						>
							{multi && (
								<span
									className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
										isSelected(option.value)
											? "border-[#85DBD8] bg-[#85DBD8]/20"
											: "border-[var(--line)]"
									}`}
								>
									{isSelected(option.value) && (
										<Check size={10} className="text-[#85DBD8]" />
									)}
								</span>
							)}
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
