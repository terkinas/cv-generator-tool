import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { EntryCard } from "@/components/ui/EntryCard";
import { InsertDivider } from "@/components/ui/InsertDivider";
import { PlusIcon } from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { TextField } from "@/components/ui/TextField";
import {
  createExperience,
  insertAt,
  moveItem,
  removeById,
  updateById,
} from "@/lib/cv-helpers";
import type { ExperienceEntry } from "@/types/cv";

interface ExperienceSectionProps {
  items: ExperienceEntry[];
  onChange: (items: ExperienceEntry[]) => void;
}

export function ExperienceSection({ items, onChange }: ExperienceSectionProps) {
  const insert = (index: number) =>
    onChange(insertAt(items, index, createExperience()));

  const update = (id: string, patch: Partial<Omit<ExperienceEntry, "id">>) =>
    onChange(updateById(items, id, patch));

  return (
    <SectionCard
      title="Work experience"
      description="Most recent positions first. Use the arrows to reorder, or “Insert here” to add one in between."
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <EmptyState>
            No work experience yet. Add your first position.
          </EmptyState>
        ) : (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <Fragment key={item.id}>
                <InsertDivider
                  label={`Insert a position before position ${index + 1}`}
                  onInsert={() => insert(index)}
                />
                <EntryCard
                  label={`Position ${index + 1}`}
                  removeLabel={`Remove position ${index + 1}${
                    item.title.trim() ? `: ${item.title.trim()}` : ""
                  }`}
                  onRemove={() => onChange(removeById(items, item.id))}
                  onMoveUp={
                    index > 0
                      ? () => onChange(moveItem(items, index, index - 1))
                      : undefined
                  }
                  onMoveDown={
                    index < items.length - 1
                      ? () => onChange(moveItem(items, index, index + 1))
                      : undefined
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(title) => update(item.id, { title })}
                      placeholder="e.g. Frontend Engineer"
                    />
                    <TextField
                      label="Subtitle"
                      value={item.subtitle}
                      onChange={(subtitle) => update(item.id, { subtitle })}
                      placeholder="Company, City"
                    />
                    <TextField
                      className="sm:col-span-2"
                      label="Date"
                      value={item.date}
                      onChange={(date) => update(item.id, { date })}
                      placeholder="2021 – Present"
                    />
                    <TextAreaField
                      className="sm:col-span-2"
                      label="Description"
                      rows={5}
                      value={item.description}
                      onChange={(description) =>
                        update(item.id, { description })
                      }
                      hint="Line breaks are kept in the preview."
                    />
                  </div>
                </EntryCard>
              </Fragment>
            ))}
          </ul>
        )}
        <Button
          variant="dashed"
          onClick={() => onChange([...items, createExperience()])}
        >
          <PlusIcon /> Add experience
        </Button>
      </div>
    </SectionCard>
  );
}
