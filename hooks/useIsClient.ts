"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false during SSR and during the hydration render, true afterwards.
 * React uses the server snapshot while hydrating, so the first client render
 * matches the server HTML exactly (no hydration mismatch) and then switches.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
