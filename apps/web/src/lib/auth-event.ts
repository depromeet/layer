type AuthExpiredListener = () => void;

let listener: AuthExpiredListener | null = null;

export function onAuthExpired(callback: AuthExpiredListener) {
  listener = callback;
  return () => { listener = null; };
}

export function emitAuthExpired() {
  listener?.();
}
