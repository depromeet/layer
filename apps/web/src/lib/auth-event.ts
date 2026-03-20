type AuthExpiredListener = () => void;

const listeners = new Set<AuthExpiredListener>();

export function onAuthExpired(callback: AuthExpiredListener) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function emitAuthExpired() {
  listeners.forEach((l) => l());
}
