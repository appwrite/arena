import Claude from "@lobehub/icons/es/Claude/components/Mono";
import Gemini from "@lobehub/icons/es/Gemini/components/Mono";
import Kimi from "@lobehub/icons/es/Kimi/components/Mono";
import OpenAI from "@lobehub/icons/es/OpenAI/components/Mono";
import type { ComponentType, SVGProps } from "react";

interface ProviderLogoProps {
	provider: string;
	size?: number;
}

type IconEntry = {
	Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
	brandColor: string;
};

const PROVIDERS: Record<string, IconEntry> = {
	Anthropic: { Icon: Claude, brandColor: "#D4A27F" },
	OpenAI: { Icon: OpenAI, brandColor: "#ffffff" },
	Google: { Icon: Gemini, brandColor: "#4285F4" },
	MoonshotAI: { Icon: Kimi, brandColor: "#0071e3" },
};

export default function ProviderLogo({
	provider,
	size = 20,
}: ProviderLogoProps) {
	const entry = PROVIDERS[provider];
	if (!entry) {
		return (
			<span
				className="inline-flex items-center justify-center rounded-full bg-[var(--line)] text-xs font-medium text-[var(--text-secondary)]"
				style={{ width: size, height: size }}
			>
				{provider.charAt(0)}
			</span>
		);
	}

	const { Icon, brandColor } = entry;

	return (
		<span className="relative inline-flex">
			<span className="group-hover:opacity-0 transition-opacity">
				<Icon size={size} color="var(--text-secondary)" />
			</span>
			<span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
				<Icon size={size} color={brandColor} />
			</span>
		</span>
	);
}
