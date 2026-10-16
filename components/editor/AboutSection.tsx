import { SectionCard } from "@/components/ui/SectionCard";
import { TextAreaField } from "@/components/ui/TextAreaField";

interface AboutSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function AboutSection({ value, onChange }: AboutSectionProps) {
  return (
    <SectionCard
      title="About me"
      description="A short summary of who you are and what you do."
    >
      <TextAreaField
        label="About me"
        hideLabel
        rows={6}
        value={value}
        onChange={onChange}
        placeholder="Write 2–4 sentences about your background and goals."
      />
    </SectionCard>
  );
}
