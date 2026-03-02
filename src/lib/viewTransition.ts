import { flushSync } from "react-dom";

export function withViewTransition(fn: () => void | Promise<void>) {
	if (document.startViewTransition) {
		document.startViewTransition(() => {
			document.documentElement.classList.add("vt-active");
			flushSync(() => {
				fn();
			});
		});
	} else {
		fn();
	}
}
