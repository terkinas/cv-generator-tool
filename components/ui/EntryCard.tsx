import type { ReactNode } from "react";
import { Button } from "./Button";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "./icons";

interface EntryCardProps {
  label: string;
  removeLabel: string;
  onRemove: () => void;
  /** Omit both to hide the reorder buttons. */
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: ReactNode;
}

/** A single repeatable list item (rendered as <li>) with a remove button. */
export function EntryCard({
  label,
  removeLabel,
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
}: EntryCardProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <div className="flex items-center gap-0.5">
          <Button
            variant="danger"
            size="icon"
            aria-label={`Move up: ${label}`}
            title="Move up"
            onClick={onMoveUp}
            disabled={!onMoveUp}
            className="hover:!bg-slate-100 hover:!text-slate-700"
          >
            <ArrowUpIcon />
          </Button>
          <Button
            variant="danger"
            size="icon"
            aria-label={`Move down: ${label}`}
            title="Move down"
            onClick={onMoveDown}
            disabled={!onMoveDown}
            className="hover:!bg-slate-100 hover:!text-slate-700"
          >
            <ArrowDownIcon />
          </Button>
          <Button
            variant="danger"
            size="icon"
            aria-label={removeLabel}
            title="Remove"
            onClick={onRemove}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
      {children}
    </li>
  );
}
