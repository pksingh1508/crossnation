import type { AbstractIntlMessages } from "next-intl";
import {
  FileText,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** The site's legal pages */
export type PolicyKey = "privacy" | "refund" | "terms" | "antiFraud";

interface PolicySettings {
  path: string;
  /** The translations that hold its text */
  namespace:
    | "privacyPolicy"
    | "refundPolicy"
    | "termsAndConditions"
    | "antiFraudPolicy";
  /** Its name: a key in footer.bottom, so the page has the name of the link to it */
  label:
    | "privacyPolicy"
    | "refundPolicy"
    | "termsOfService"
    | "antiFraudPolicy";
  /** Its name in the breadcrumbs (they are in English) */
  breadcrumb: string;
  icon: LucideIcon;
}

/** In the footer's order */
export const POLICIES: Record<PolicyKey, PolicySettings> = {
  privacy: {
    path: "/privacy-policy",
    namespace: "privacyPolicy",
    label: "privacyPolicy",
    breadcrumb: "Privacy Policy",
    icon: ShieldCheck,
  },
  refund: {
    path: "/refund-policy",
    namespace: "refundPolicy",
    label: "refundPolicy",
    breadcrumb: "Refund Policy",
    icon: ReceiptText,
  },
  terms: {
    path: "/terms-conditions",
    namespace: "termsAndConditions",
    label: "termsOfService",
    breadcrumb: "Terms of Service",
    icon: FileText,
  },
  antiFraud: {
    path: "/antiFraud-policy",
    namespace: "antiFraudPolicy",
    label: "antiFraudPolicy",
    breadcrumb: "Anti-Fraud Policy",
    icon: ShieldAlert,
  },
};

/** A point of a section, with the points it introduces ("…such as:") */
export type PolicyPoint = { kind: "point"; text: string; items: string[] };
/** A highlighted note with a title of its own */
export type PolicyNote = { kind: "note"; title: string; items: string[] };

export interface PolicySection {
  /** The anchor in the page's address, e.g. #section-3 */
  id: string;
  number: number;
  title: string;
  content: (PolicyPoint | PolicyNote)[];
}

export interface PolicyDocument {
  /** The document's own title */
  title: string;
  sections: PolicySection[];
  /** Its length, for the reading time */
  words: number;
}

const texts = (group: AbstractIntlMessages) =>
  Object.values(group).filter(
    (value): value is string => typeof value === "string"
  );

/**
 * A policy from its translations: { mainHeading, heading1: { title, … }, heading2: … }. A
 * section's entries are read in order. A text is a point (paragraph1, point2, …). A group
 * of texts (subParagraphs) belongs to the point just before it, which introduces it; a
 * group with a subTitle is a note of its own. So adding a point to the translations is
 * all it takes to show it.
 */
export function readPolicy(messages: AbstractIntlMessages): PolicyDocument {
  let words = 0;
  const count = (text: string) => {
    words += text.split(/\s+/).filter(Boolean).length;
    return text;
  };

  const sections = Object.entries(messages)
    .filter(
      (entry): entry is [string, AbstractIntlMessages] =>
        entry[0].startsWith("heading") && typeof entry[1] === "object"
    )
    .map(([, section], index) => {
      const content: PolicySection["content"] = [];
      for (const [key, value] of Object.entries(section)) {
        if (key === "title") continue;
        if (typeof value === "string") {
          content.push({ kind: "point", text: count(value), items: [] });
        } else if (typeof value.subTitle === "string") {
          const { subTitle, ...rest } = value;
          content.push({
            kind: "note",
            title: count(subTitle),
            items: texts(rest).map(count),
          });
        } else {
          const items = texts(value).map(count);
          const last = content.at(-1);
          if (last?.kind === "point") last.items.push(...items);
          else if (items.length)
            content.push({ kind: "point", text: "", items });
        }
      }
      const title = String(section.title ?? "");
      return {
        id: `section-${index + 1}`,
        number: index + 1,
        title: count(title),
        content,
      };
    });

  return { title: String(messages.mainHeading ?? ""), sections, words };
}
