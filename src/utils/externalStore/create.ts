import { useSyncExternalStore } from "react";

import { State } from "@/utils/externalStore/hook.ts";

export function useStore<T>(state: State<T>) {
  const store = useSyncExternalStore(state.subscribe, state.getState, state.getState);

  return [store, state.setState] as const;
}
