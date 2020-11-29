import { createContext, ReactNode, useContext } from "react";
import RootStore from "../stores/RootStore";

let store: RootStore;

export const StoreContext = createContext<RootStore | null>(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = createStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function createStore() {
  const _store = store ?? new RootStore();

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
}
