import ClaudeColor from "@lobehub/icons/es/Claude/components/Color";
import Claude from "@lobehub/icons/es/Claude/components/Mono";
import GeminiColor from "@lobehub/icons/es/Gemini/components/Color";
import Gemini from "@lobehub/icons/es/Gemini/components/Mono";
import KimiColor from "@lobehub/icons/es/Kimi/components/Color";
import Kimi from "@lobehub/icons/es/Kimi/components/Mono";
import OpenAI from "@lobehub/icons/es/OpenAI/components/Mono";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<
	SVGProps<SVGSVGElement> & { size?: number | string }
>;

interface ProviderLogoProps {
	provider: string;
	size?: number;
	colorful?: boolean;
}

type IconEntry = {
	Icon: IconComponent;
	ColorIcon?: IconComponent;
	brandColor: string;
};

const PROVIDERS: Record<string, IconEntry> = {
	Anthropic: { Icon: Claude, ColorIcon: ClaudeColor, brandColor: "#D4A27F" },
	OpenAI: { Icon: OpenAI, brandColor: "#ffffff" },
	Google: { Icon: Gemini, ColorIcon: GeminiColor, brandColor: "#4285F4" },
	MoonshotAI: { Icon: Kimi, ColorIcon: KimiColor, brandColor: "#0071e3" },
};

export default function ProviderLogo({
	provider,
	size = 20,
	colorful = false,
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

	const { Icon, ColorIcon, brandColor } = entry;

	if (colorful) {
		if (ColorIcon) {
			return (
				<span className="inline-flex">
					<ColorIcon size={size} />
				</span>
			);
		}
		return (
			<span className="inline-flex">
				<Icon size={size} color={brandColor} />
			</span>
		);
	}

	return (
		<span className="relative inline-flex">
			<span className="group-hover:opacity-0 transition-opacity">
				<Icon size={size} color="var(--text-secondary)" />
			</span>
			<span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
				{ColorIcon ? (
					<ColorIcon size={size} />
				) : (
					<Icon size={size} color={brandColor} />
				)}
			</span>
		</span>
	);
}
