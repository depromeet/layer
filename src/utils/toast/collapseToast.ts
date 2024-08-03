export function collapseToast(node: HTMLDivElement, done: () => void, duration = 3000) {
  if (node) {
    const { scrollHeight, style } = node;

    requestAnimationFrame(() => {
      style.height = scrollHeight + "px";
      style.transition = `all ${duration}ms`;

      requestAnimationFrame(() => {
        style.height = "0";
        setTimeout(done, duration);
      });
    });
  }
}
