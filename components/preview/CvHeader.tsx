import type { ComponentType, SVGProps } from "react";
import {
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import { hasText } from "@/lib/cv-helpers";
import type { PersonalInfo } from "@/types/cv";

interface ContactItem {
  key: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: string;
}

export function CvHeader({ personal }: { personal: PersonalInfo }) {
  const fullName = [personal.firstName, personal.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");

  const contacts: ContactItem[] = [
    { key: "phone", Icon: PhoneIcon, value: personal.phone },
    { key: "email", Icon: MailIcon, value: personal.email },
    { key: "portfolio", Icon: GlobeIcon, value: personal.portfolio },
    { key: "location", Icon: MapPinIcon, value: personal.location },
  ].filter((contact) => hasText(contact.value));

  // Two rows: phone + email, then website + location (empty rows are dropped).
  const contactRows = [
    contacts.filter((c) => c.key === "phone" || c.key === "email"),
    contacts.filter((c) => c.key === "portfolio" || c.key === "location"),
  ].filter((row) => row.length > 0);

  return (
    <header className="border-b border-slate-200 px-6 pb-6 pt-7 @lg:px-8">
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 [overflow-wrap:anywhere] @lg:text-3xl">
        {fullName || <span className="text-slate-300">Your name</span>}
      </h2>
      {hasText(personal.title) ? (
        <p className="mt-1 text-base font-medium text-(--cv-accent)">
          {personal.title.trim()}
        </p>
      ) : null}

      {contactRows.length > 0 ? (
        <div className="mt-4 space-y-1.5 text-[13px] text-slate-600">
          {contactRows.map((row) => (
            <ul key={row[0].key} className="flex flex-wrap gap-x-5 gap-y-1.5">
              {row.map(({ key, Icon, value }, index) => (
                <li
                  key={key}
                  // Fixed first-column width so the second column lines up
                  // across both rows (like the PDF); wraps freely when narrow.
                  className={`flex items-center gap-1.5 ${
                    index === 0 ? "@lg:w-60" : ""
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="[overflow-wrap:anywhere]">{value.trim()}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ) : null}
    </header>
  );
}
