import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { EntryCard } from "@/components/ui/EntryCard";
import { InsertDivider } from "@/components/ui/InsertDivider";
import { PlusIcon } from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import { TextField } from "@/components/ui/TextField";
import {
  createEducation,
  insertAt,
  moveItem,
  removeById,
  updateById,
} from "@/lib/cv-helpers";
import type { EducationEntry } from "@/types/cv";

interface EducationSectionProps {
  items: EducationEntry[];
  onChange: (items: EducationEntry[]) => void;
}

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const insert = (index: number) =>
    onChange(insertAt(items, index, createEducation()));

  const update = (id: string, patch: Partial<Omit<EducationEntry, "id">>) =>
    onChange(updateById(items, id, patch));

  return (
    <SectionCard title="Education" description="Schools, degrees and courses.">
      <div className="space-y-4">
        {items.length === 0 ? (
          <EmptyState>No education yet. Add your first entry.</EmptyState>
        ) : (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <Fragment key={item.id}>
                <InsertDivider
                  label={`Insert an entry before education ${index + 1}`}
                  onInsert={() => insert(index)}
                />
                <EntryCard
                  label={`Education ${index + 1}`}
                  removeLabel={`Remove education ${index + 1}${
                    item.institution.trim()
                      ? `: ${item.institution.trim()}`
                      : ""
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
                      className="sm:col-span-2"
                      label="Institution"
                      value={item.institution}
                      onChange={(institution) =>
                        update(item.id, { institution })
                      }
                      placeholder="University or school"
                    />
                    <TextField
                      label="Subtitle"
                      value={item.subtitle}
                      onChange={(subtitle) => update(item.id, { subtitle })}
                      placeholder="Degree or field of study"
                    />
                    <TextField
                      label="Date"
                      value={item.date}
                      onChange={(date) => update(item.id, { date })}
                      placeholder="2016 – 2020"
                    />
                  </div>
                </EntryCard>
              </Fragment>
            ))}
          </ul>
        )}
        <Button
          variant="dashed"
          onClick={() => onChange([...items, createEducation()])}
        >
          <PlusIcon /> Add education
        </Button>
      </div>
    </SectionCard>
  );
}
