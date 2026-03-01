interface ProviderLogoProps {
	provider: string;
	size?: number;
}

const BRAND_COLORS: Record<string, string> = {
	Anthropic: "#D4A27F",
	OpenAI: "#ffffff",
	Google: "#4285F4",
};

function AnthropicLogo({ size, fill }: { size: number; fill: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			aria-label="Anthropic"
		>
			<title>Anthropic</title>
			<path
				d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.604L16.742 20.48h-3.603L6.569 3.52zM3.478 20.48L10.048 3.52h3.604L7.082 20.48H3.478z"
				fill={fill}
			/>
		</svg>
	);
}

function OpenAILogo({ size, fill }: { size: number; fill: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			aria-label="OpenAI"
		>
			<title>OpenAI</title>
			<path
				d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.04 6.04 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
				fill={fill}
			/>
		</svg>
	);
}

function GoogleLogo({ size, fill }: { size: number; fill: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			aria-label="Google"
		>
			<title>Google</title>
			<path
				d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
				fill={fill}
			/>
		</svg>
	);
}

const PROVIDER_LOGOS: Record<
	string,
	(props: { size: number; fill: string }) => React.ReactNode
> = {
	Anthropic: AnthropicLogo,
	OpenAI: OpenAILogo,
	Google: GoogleLogo,
};

export default function ProviderLogo({
	provider,
	size = 20,
}: ProviderLogoProps) {
	const Logo = PROVIDER_LOGOS[provider];
	if (!Logo) {
		return (
			<span
				className="inline-flex items-center justify-center rounded-full bg-[var(--line)] text-xs font-medium text-[var(--text-secondary)]"
				style={{ width: size, height: size }}
			>
				{provider.charAt(0)}
			</span>
		);
	}

	const brandColor = BRAND_COLORS[provider] ?? "var(--text-secondary)";

	return (
		<span className="relative inline-flex">
			<span className="group-hover:opacity-0 transition-opacity">
				<Logo size={size} fill="var(--text-secondary)" />
			</span>
			<span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
				<Logo size={size} fill={brandColor} />
			</span>
		</span>
	);
}
