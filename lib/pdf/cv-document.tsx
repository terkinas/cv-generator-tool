import {
  Circle,
  Document,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { hasText } from "@/lib/cv-helpers";
import { LANGUAGE_LEVELS, type CvData, type LanguageLevel } from "@/types/cv";
import { PDF_FONT_FAMILY } from "./fonts";

/*
 * Layout notes
 * ------------
 * Sizes mirror the on-screen preview (Tailwind px) converted to PDF points
 * (1px = 0.75pt), so the PDF looks like the preview rather than a different
 * design. Colours are the same Tailwind slate / indigo tones.
 *
 * Page structure: the first page has a full-width header, then a two-column
 * row (sidebar + main). The sidebar tint is a `fixed` element so it is drawn
 * on every page behind the content; the header paints a white background over
 * it, which makes the tint start right below the header on page 1 and run the
 * full height on continuation pages. Both columns flow across pages.
 */

const COLOR = {
  ink: "#0f172a", // slate-900
  body: "#475569", // slate-600
  muted: "#64748b", // slate-500
  faint: "#94a3b8", // slate-400
  line: "#e2e8f0", // slate-200
  panel: "#f8fafc", // slate-50
  accent: "#4f46e5", // default accent (indigo-600); overridden per theme
  white: "#ffffff",
};

const PAGE_MARGIN_Y = 36;
const SIDEBAR_WIDTH = 196; // ~1/3 of the 595pt A4 width, like the preview's 1fr/2fr grid
const FONT_SIZE = 9.75; // text-[13px]
const FONT_SIZE_SMALL = 9; // text-xs

/*
 * react-pdf resolves a unitless `lineHeight` against the element's OWN
 * `fontSize` (not an inherited one - that would fall back to the 18pt
 * default). So every style that sets a lineHeight also sets its fontSize.
 */
const styles = StyleSheet.create({
  page: {
    paddingTop: PAGE_MARGIN_Y,
    paddingBottom: PAGE_MARGIN_Y,
    backgroundColor: COLOR.white,
    fontFamily: PDF_FONT_FAMILY,
    fontSize: FONT_SIZE,
    fontWeight: 400,
    color: COLOR.body,
  },
  sidebarTint: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: COLOR.panel,
    borderRightWidth: 0.75,
    borderRightColor: COLOR.line,
  },

  // Header (page 1 only)
  header: {
    // Cancel the page's top margin so the accent bar touches the page edge.
    marginTop: -PAGE_MARGIN_Y,
    backgroundColor: COLOR.white,
    borderBottomWidth: 0.75,
    borderBottomColor: COLOR.line,
  },
  accentBar: { height: 4.5, backgroundColor: COLOR.accent },
  headerBody: { paddingTop: 22, paddingBottom: 18, paddingHorizontal: 30 },
  name: {
    fontSize: 22.5,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.3,
    color: COLOR.ink,
  },
  jobTitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 1.3,
    fontWeight: 500,
    color: COLOR.accent,
  },
  contacts: { marginTop: 12, rowGap: 4 },
  contactRow: { flexDirection: "row" },
  // Fixed first-column width so the second column lines up across both rows.
  contactCol: { width: 190 },
  contact: { flexDirection: "row", alignItems: "center", columnGap: 4.5 },
  contactText: { flexShrink: 1, fontSize: FONT_SIZE, lineHeight: 1.4 },

  // Columns
  columns: { flexDirection: "row" },
  sidebar: {
    width: SIDEBAR_WIDTH,
    paddingTop: 22,
    paddingLeft: 30,
    paddingRight: 18,
    rowGap: 21,
  },
  main: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 24,
    paddingRight: 30,
    rowGap: 21,
  },

  // Sections
  sectionTitle: {
    marginBottom: 9,
    fontSize: 8,
    lineHeight: 1.2,
    fontWeight: 600,
    // Wider tracking looks closer to the preview but makes PDF viewers copy the
    // heading as "E D U C A T I O N"; 0.6 is the widest that copies cleanly.
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLOR.accent,
  },

  // Sidebar content
  eduList: { rowGap: 10.5 },
  eduInstitution: {
    fontSize: FONT_SIZE,
    lineHeight: 1.35,
    fontWeight: 600,
    color: COLOR.ink,
  },
  eduText: { fontSize: FONT_SIZE, lineHeight: 1.4 },
  eduDate: {
    marginTop: 1.5,
    fontSize: FONT_SIZE_SMALL,
    lineHeight: 1.4,
    color: COLOR.muted,
  },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 4.5 },
  skill: {
    paddingVertical: 1.5,
    paddingHorizontal: 6,
    borderWidth: 0.75,
    borderColor: COLOR.line,
    borderRadius: 4,
    backgroundColor: COLOR.white,
  },
  skillText: {
    fontSize: FONT_SIZE_SMALL,
    lineHeight: 1.3,
    fontWeight: 500,
    color: "#334155", // slate-700
  },
  langList: { rowGap: 7.5 },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 6,
  },
  langName: {
    flexShrink: 1,
    fontSize: FONT_SIZE,
    lineHeight: 1.4,
    fontWeight: 500,
    color: COLOR.ink,
  },
  dots: { flexDirection: "row", columnGap: 3 },
  dot: { width: 4.5, height: 4.5, borderRadius: 2.25 },
  langLevel: { fontSize: FONT_SIZE_SMALL, lineHeight: 1.4, color: COLOR.muted },

  // Main content
  paragraph: { fontSize: FONT_SIZE, lineHeight: 1.6 },
  expList: { rowGap: 15 },
  expItem: {
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: COLOR.line,
  },
  expHeadRow: { flexDirection: "row", alignItems: "baseline", columnGap: 12 },
  expTitleBox: { flex: 1 },
  expTitle: {
    fontSize: FONT_SIZE,
    lineHeight: 1.4,
    fontWeight: 600,
    color: COLOR.ink,
  },
  expDate: {
    flexShrink: 0,
    fontSize: FONT_SIZE_SMALL,
    lineHeight: 1.4,
    color: COLOR.muted,
  },
  expSubtitle: { fontSize: FONT_SIZE, lineHeight: 1.4 },
  expDescription: { marginTop: 4.5 },

  bulletRow: { flexDirection: "row" },
  bulletMark: { width: 10, fontSize: FONT_SIZE, lineHeight: 1.6 },
  bulletText: { flex: 1, fontSize: FONT_SIZE, lineHeight: 1.6 },
  blankLine: { height: 6 },
});

// ---------------------------------------------------------------------------
// Icons - same paths as components/ui/icons.tsx (those are DOM <svg>s and
// cannot be rendered by react-pdf, so the path data is repeated here).
// ---------------------------------------------------------------------------

type ContactIconName = "phone" | "email" | "portfolio" | "location";

function ContactIcon({ name }: { name: ContactIconName }) {
  const stroke = {
    stroke: COLOR.faint,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  return (
    <Svg viewBox="0 0 24 24" width={9.5} height={9.5}>
      {name === "phone" ? (
        <Path
          {...stroke}
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        />
      ) : null}
      {name === "email" ? (
        <>
          <Rect {...stroke} x={3} y={5} width={18} height={14} rx={2} />
          <Path {...stroke} d="m3 7 9 6 9-6" />
        </>
      ) : null}
      {name === "portfolio" ? (
        <>
          <Circle {...stroke} cx={12} cy={12} r={10} />
          <Path {...stroke} d="M2 12h20" />
          <Path
            {...stroke}
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          />
        </>
      ) : null}
      {name === "location" ? (
        <>
          <Path {...stroke} d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <Circle {...stroke} cx={12} cy={10} r={3} />
        </>
      ) : null}
    </Svg>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <View>
      {/* minPresenceAhead keeps a heading from being stranded at a page bottom */}
      <Text
        style={[styles.sectionTitle, { color: accent }]}
        minPresenceAhead={48}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

/** "•", "-", "–" or "*" followed by a space starts a bullet line. */
const BULLET_PATTERN = /^\s*[•\-–*]\s+/;

/**
 * Renders user text the way the preview does (`whitespace-pre-line`): line
 * breaks are kept, and bullet lines get a hanging indent so wrapped lines
 * align under the text instead of under the bullet.
 */
function MultilineText({ text }: { text: string }) {
  const lines = text.trim().split(/\r?\n/);

  return (
    <View>
      {lines.map((line, index) => {
        if (line.trim() === "") {
          return <View key={index} style={styles.blankLine} />;
        }

        const bullet = BULLET_PATTERN.exec(line);
        if (bullet) {
          return (
            <View key={index} style={styles.bulletRow} wrap={false}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>
                {line.slice(bullet[0].length).trim()}
              </Text>
            </View>
          );
        }

        return (
          <Text key={index} style={styles.paragraph}>
            {line.trim()}
          </Text>
        );
      })}
    </View>
  );
}

function LevelDots({
  level,
  accent,
}: {
  level: LanguageLevel;
  accent: string;
}) {
  const filled = LANGUAGE_LEVELS.indexOf(level) + 1;

  return (
    <View style={styles.dots}>
      {LANGUAGE_LEVELS.map((option, index) => (
        <View
          key={option}
          style={[
            styles.dot,
            { backgroundColor: index < filled ? accent : COLOR.line },
          ]}
        />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

export function CvPdfDocument({
  cv,
  accent = COLOR.accent,
}: {
  cv: CvData;
  accent?: string;
}) {
  const { personal } = cv;
  const fullName = [personal.firstName, personal.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");

  const contacts: { key: ContactIconName; value: string }[] = [
    { key: "phone" as const, value: personal.phone },
    { key: "email" as const, value: personal.email },
    { key: "portfolio" as const, value: personal.portfolio },
    { key: "location" as const, value: personal.location },
  ].filter((contact) => hasText(contact.value));

  // Two fixed rows: phone + email, then website + location. A row is dropped
  // when both of its items are empty.
  const contactRows = [
    contacts.filter((c) => c.key === "phone" || c.key === "email"),
    contacts.filter((c) => c.key === "portfolio" || c.key === "location"),
  ].filter((row) => row.length > 0);

  // Same visibility rules as the on-screen preview.
  const education = cv.education.filter((item) =>
    hasText(item.institution, item.subtitle, item.date),
  );
  const skills = cv.skills.filter((item) => hasText(item.name));
  const languages = cv.languages.filter((item) => hasText(item.name));
  const experience = cv.experience.filter((item) =>
    hasText(item.title, item.subtitle, item.date, item.description),
  );

  return (
    <Document
      title={fullName ? `${fullName} – CV` : "CV"}
      author={fullName || undefined}
      creator="CV Generator"
      producer="CV Generator"
      language="lt"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebarTint} fixed />

        <View style={styles.header}>
          <View style={[styles.accentBar, { backgroundColor: accent }]} />
          <View style={styles.headerBody}>
            {fullName ? <Text style={styles.name}>{fullName}</Text> : null}
            {hasText(personal.title) ? (
              <Text style={[styles.jobTitle, { color: accent }]}>{personal.title.trim()}</Text>
            ) : null}

            {contacts.length > 0 ? (
              <View style={styles.contacts}>
                {contactRows.map((row) => (
                  <View key={row[0].key} style={styles.contactRow}>
                    {row.map(({ key, value }, index) => (
                      <View
                        key={key}
                        style={[
                          styles.contact,
                          index === 0 ? styles.contactCol : {},
                        ]}
                      >
                        <ContactIcon name={key} />
                        <Text style={styles.contactText}>{value.trim()}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.columns}>
          {/* Left column: Education, Skills, Languages */}
          <View style={styles.sidebar}>
            {education.length > 0 ? (
              <Section title="Education" accent={accent}>
                <View style={styles.eduList}>
                  {education.map((item) => (
                    <View key={item.id} minPresenceAhead={30}>
                      {hasText(item.institution) ? (
                        <Text style={styles.eduInstitution}>
                          {item.institution.trim()}
                        </Text>
                      ) : null}
                      {hasText(item.subtitle) ? (
                        <Text style={styles.eduText}>
                          {item.subtitle.trim()}
                        </Text>
                      ) : null}
                      {hasText(item.date) ? (
                        <Text style={styles.eduDate}>{item.date.trim()}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              </Section>
            ) : null}

            {skills.length > 0 ? (
              <Section title="Skills" accent={accent}>
                <View style={styles.skills}>
                  {skills.map((item) => (
                    <View key={item.id} style={styles.skill} wrap={false}>
                      <Text style={styles.skillText}>{item.name.trim()}</Text>
                    </View>
                  ))}
                </View>
              </Section>
            ) : null}

            {languages.length > 0 ? (
              <Section title="Languages" accent={accent}>
                <View style={styles.langList}>
                  {languages.map((item) => (
                    <View key={item.id} wrap={false}>
                      <View style={styles.langRow}>
                        <Text style={styles.langName}>{item.name.trim()}</Text>
                        <LevelDots level={item.level} accent={accent} />
                      </View>
                      <Text style={styles.langLevel}>{item.level}</Text>
                    </View>
                  ))}
                </View>
              </Section>
            ) : null}
          </View>

          {/* Right column: About me, Work experience */}
          <View style={styles.main}>
            {hasText(cv.about) ? (
              <Section title="About me" accent={accent}>
                <MultilineText text={cv.about} />
              </Section>
            ) : null}

            {experience.length > 0 ? (
              <Section title="Work experience" accent={accent}>
                <View style={styles.expList}>
                  {experience.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      {/* Title, date and employer stay together on one page */}
                      <View wrap={false} minPresenceAhead={40}>
                        <View style={styles.expHeadRow}>
                          <View style={styles.expTitleBox}>
                            {hasText(item.title) ? (
                              <Text style={styles.expTitle}>
                                {item.title.trim()}
                              </Text>
                            ) : null}
                          </View>
                          {hasText(item.date) ? (
                            <Text style={styles.expDate}>
                              {item.date.trim()}
                            </Text>
                          ) : null}
                        </View>
                        {hasText(item.subtitle) ? (
                          <Text style={styles.expSubtitle}>
                            {item.subtitle.trim()}
                          </Text>
                        ) : null}
                      </View>

                      {hasText(item.description) ? (
                        <View style={styles.expDescription}>
                          <MultilineText text={item.description} />
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              </Section>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}
