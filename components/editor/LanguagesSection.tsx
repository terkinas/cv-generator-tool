import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { TrashIcon, PlusIcon } from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { createLanguage, removeById, updateById } from "@/lib/cv-helpers";
import { LANGUAGE_LEVELS, type LanguageEntry } from "@/types/cv";

interface LanguagesSectionProps {
  items: LanguageEntry[];
  onChange: (items: LanguageEntry[]) => void;
}

export function LanguagesSection({ items, onChange }: LanguagesSectionProps) {
  const handleLevelChange = (id: string, value: string) => {
    const level = LANGUAGE_LEVELS.find((option) => option === value);
    if (level) onChange(updateById(items, id, { level }));
  };

  return (
    <SectionCard
      title="Languages"
      description="Languages you speak and how well."
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <EmptyState>No languages yet. Add your first language.</EmptyState>
        ) : (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="grid items-end gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:grid-cols-[minmax(0,1fr)_11rem_auto]"
              >
                <TextField
                  label="Language"
                  value={item.name}
                  onChange={(name) =>
                    onChange(updateById(items, item.id, { name }))
                  }
                  placeholder="e.g. English"
                />
                <SelectField
                  label="Level"
                  value={item.level}
                  options={LANGUAGE_LEVELS}
                  onChange={(value) => handleLevelChange(item.id, value)}
                />
                <Button
                  variant="danger"
                  size="icon"
                  className="h-[2.375rem] w-[2.375rem] justify-self-end"
                  aria-label={`Remove language ${index + 1}${
                    item.name.trim() ? `: ${item.name.trim()}` : ""
                  }`}
                  title="Remove"
                  onClick={() => onChange(removeById(items, item.id))}
                >
                  <TrashIcon />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="dashed"
          onClick={() => onChange([...items, createLanguage()])}
        >
          <PlusIcon /> Add language
        </Button>
      </div>
    </SectionCard>
  );
}
