export function collapseToast(node: HTMLDivElement, done: () => void, duration = 1000) {
  if (node) {
    const { scrollHeight, style } = node;

    requestAnimationFrame(() => {
      style.height = scrollHeight + "px";
      style.transition = `all ${duration}ms`;
      style.zIndex = "-1";

      requestAnimationFrame(() => {
        style.height = "0";
        style.zIndex = "-1";

        setTimeout(done, duration);
      });
    });
  }
}
