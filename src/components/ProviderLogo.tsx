import { getProviderBrandColor } from "../../benchmark/src/config";
import ClaudeColor from "@lobehub/icons/es/Claude/components/Color";
import Claude from "@lobehub/icons/es/Claude/components/Mono";
import DeepSeekColor from "@lobehub/icons/es/DeepSeek/components/Color";
import DeepSeek from "@lobehub/icons/es/DeepSeek/components/Mono";
import GeminiColor from "@lobehub/icons/es/Gemini/components/Color";
import Gemini from "@lobehub/icons/es/Gemini/components/Mono";
import KimiColor from "@lobehub/icons/es/Kimi/components/Color";
import Kimi from "@lobehub/icons/es/Kimi/components/Mono";
import MinimaxColor from "@lobehub/icons/es/Minimax/components/Color";
import Minimax from "@lobehub/icons/es/Minimax/components/Mono";
import OpenAI from "@lobehub/icons/es/OpenAI/components/Mono";
import QwenColor from "@lobehub/icons/es/Qwen/components/Color";
import Qwen from "@lobehub/icons/es/Qwen/components/Mono";
import Grok from "@lobehub/icons/es/Grok/components/Mono";
import ZhipuColor from "@lobehub/icons/es/Zhipu/components/Color";
import Zhipu from "@lobehub/icons/es/Zhipu/components/Mono";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<
	SVGProps<SVGSVGElement> & { size?: number | string }
>;

const PROVIDER_ICONS: Record<
	string,
	{ Icon: IconComponent; ColorIcon?: IconComponent }
> = {
	Anthropic: { Icon: Claude, ColorIcon: ClaudeColor },
	OpenAI: { Icon: OpenAI },
	Google: { Icon: Gemini, ColorIcon: GeminiColor },
	MoonshotAI: { Icon: Kimi, ColorIcon: KimiColor },
	Zhipu: { Icon: Zhipu, ColorIcon: ZhipuColor },
	Alibaba: { Icon: Qwen, ColorIcon: QwenColor },
	DeepSeek: { Icon: DeepSeek, ColorIcon: DeepSeekColor },
	MiniMax: { Icon: Minimax, ColorIcon: MinimaxColor },
	xAI: { Icon: Grok },
};

interface ProviderLogoProps {
	provider: string;
	size?: number;
	colorful?: boolean;
}

export default function ProviderLogo({
	provider,
	size = 20,
	colorful = false,
}: ProviderLogoProps) {
	const icons = PROVIDER_ICONS[provider];
	const brandColor = getProviderBrandColor(provider) ?? "var(--text-secondary)";

	if (!icons) {
		return (
			<span
				className="inline-flex items-center justify-center rounded-full bg-[var(--line)] text-xs font-medium text-[var(--text-secondary)]"
				style={{ width: size, height: size }}
			>
				{provider.charAt(0)}
			</span>
		);
	}

	const { Icon, ColorIcon } = icons;

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
