export const resize = (listener: EventListener) => {
	window.addEventListener("resize", listener);
	return {
		listener,
		remove() {
			window.removeEventListener("resize", listener);
		}
	};
};

export default {
	resize
};
