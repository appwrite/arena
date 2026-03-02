export function withViewTransition(fn: () => void | Promise<void>) {
	fn();
}
