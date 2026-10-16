import { PlusIcon } from "./icons";

interface InsertDividerProps {
  label: string;
  onInsert: () => void;
}

/**
 * A thin row between list items with a "+" button, used to insert a new
 * entry at that exact position instead of only at the end of the list.
 */
export function InsertDivider({ label, onInsert }: InsertDividerProps) {
  return (
    <li aria-hidden={false} className="group flex items-center gap-3 py-0.5">
      <span className="h-px flex-1 bg-slate-200" />
      <button
        type="button"
        onClick={onInsert}
        aria-label={label}
        className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-surface px-2.5 py-0.5 text-xs font-medium text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:hover:text-indigo-300"
      >
        <PlusIcon width={12} height={12} /> Insert here
      </button>
      <span className="h-px flex-1 bg-slate-200" />
    </li>
  );
}
