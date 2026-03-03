import { flushSync } from "react-dom";

export function withViewTransition(fn: () => void | Promise<void>) {
	if (document.startViewTransition) {
		const transition = document.startViewTransition(() => {
			document.documentElement.classList.add("vt-active");
			flushSync(() => {
				fn();
			});
		});
		transition.finished.then(() => {
			document.documentElement.classList.remove("vt-active");
		});
	} else {
		fn();
	}
}
