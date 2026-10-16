import { SectionCard } from "@/components/ui/SectionCard";
import { TextField } from "@/components/ui/TextField";
import type { PersonalInfo } from "@/types/cv";

interface PersonalInfoSectionProps {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

export function PersonalInfoSection({
  value,
  onChange,
}: PersonalInfoSectionProps) {
  const update = (field: keyof PersonalInfo) => (fieldValue: string) =>
    onChange({ ...value, [field]: fieldValue });

  return (
    <SectionCard
      title="Personal information"
      description="Shown in the header of your CV."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          value={value.firstName}
          onChange={update("firstName")}
          autoComplete="given-name"
        />
        <TextField
          label="Last name"
          value={value.lastName}
          onChange={update("lastName")}
          autoComplete="family-name"
        />
        <TextField
          className="sm:col-span-2"
          label="Professional title"
          value={value.title}
          onChange={update("title")}
          placeholder="e.g. Product Designer"
          autoComplete="organization-title"
        />
        <TextField
          label="Phone"
          type="tel"
          value={value.phone}
          onChange={update("phone")}
          autoComplete="tel"
        />
        <TextField
          label="Email"
          type="email"
          value={value.email}
          onChange={update("email")}
          autoComplete="email"
        />
        <TextField
          label="Portfolio"
          type="url"
          value={value.portfolio}
          onChange={update("portfolio")}
          placeholder="yourname.com"
          autoComplete="url"
        />
        <TextField
          label="Location"
          value={value.location}
          onChange={update("location")}
          placeholder="City, Country"
          autoComplete="address-level2"
        />
      </div>
    </SectionCard>
  );
}
