import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PlusIcon, XIcon } from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import { TextField } from "@/components/ui/TextField";
import { createSkill, removeById } from "@/lib/cv-helpers";
import type { SkillEntry } from "@/types/cv";

interface SkillsSectionProps {
  items: SkillEntry[];
  onChange: (items: SkillEntry[]) => void;
}

export function SkillsSection({ items, onChange }: SkillsSectionProps) {
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = draft.trim();
    if (!name) return;

    const alreadyAdded = items.some(
      (skill) => skill.name.toLowerCase() === name.toLowerCase(),
    );
    if (!alreadyAdded) {
      onChange([...items, createSkill(name)]);
    }
    setDraft("");
  };

  return (
    <SectionCard
      title="Skills"
      description="Type a skill and press Enter or click Add."
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <TextField
          className="min-w-0 flex-1"
          label="Skill"
          value={draft}
          onChange={setDraft}
          placeholder="e.g. TypeScript"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={draft.trim().length === 0}
          className="h-[2.375rem]"
        >
          <PlusIcon /> Add
        </Button>
      </form>

      {items.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {items.map((skill) => (
            <li
              key={skill.id}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 py-1 pl-3 pr-1 text-sm text-slate-700"
            >
              <span>{skill.name}</span>
              <button
                type="button"
                aria-label={`Remove skill ${skill.name}`}
                onClick={() => onChange(removeById(items, skill.id))}
                className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/15 dark:hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <XIcon width={12} height={12} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No skills added yet.</p>
      )}
    </SectionCard>
  );
}
