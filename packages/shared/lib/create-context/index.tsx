import * as React from "react";

function createContext<ContextValueType extends object | null>(rootComponentName: string, defaultContext?: ContextValueType) {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

  function Provider(props: ContextValueType & { children: React.ReactNode }) {
    const { children, ...context } = props;
    const value = React.useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context),
    ) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext(consumerName?: string) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error(`\`${consumerName || rootComponentName}\` must be used within \`${rootComponentName}\``);
  }

  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext] as const;
}

export { createContext };
