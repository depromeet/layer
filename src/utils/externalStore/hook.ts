type Fn = () => void;
type UpdateFn<T> = (state: T) => T;

export type State<T> = {
  getState: () => T;
  setState: (update: UpdateFn<T> | T) => void;
  subscribe: (callback: Fn) => Fn;
};

function isUpdateFn<T>(value: UpdateFn<T> | T): value is UpdateFn<T> {
  return typeof value === "function";
}

export function externalStore<T>(initialState: T): State<T> {
  let state = initialState;
  const callbacks = new Set<Fn>();

  function subscribe(callback: Fn): Fn {
    callbacks.add(callback);
    return () => callbacks.delete(callback);
  }

  function getState() {
    return state;
  }

  function setState(update: UpdateFn<T> | T) {
    state = isUpdateFn<T>(update) ? update(state) : update;
    callbacks.forEach((cb) => cb());
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
