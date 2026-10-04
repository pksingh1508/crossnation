"use client";

import { useId } from "react";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { BUTTON_ARROW, PRIMARY_BUTTON } from "./JobsHero";
import { SectionIntro } from "./SectionIntro";
import type { CountryJobs, Role, RoleGroup } from "./types";

interface OpenRolesProps {
  country: CountryJobs;
  /** Scrolls to the application form, for the given job */
  onApply: (role?: string) => void;
}

/**
 * The open jobs, each a row that leads to the form with the job filled in, beside what an
 * applicant sends us. The rows rise into view one after another.
 */
export function OpenRoles({ country, onApply }: OpenRolesProps) {
  const { roles, documents } = country;
  const titleId = useId();
  const count = roles.groups.reduce(
    (sum, group) => sum + group.roles.length,
    0
  );

  return (
    <section
      id="jobs"
      aria-labelledby={titleId}
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionIntro
            id={titleId}
            eyebrow={`Open positions · ${count} ${count === 1 ? "role" : "roles"}`}
            title={roles.title}
          />
          <div className="mt-10 space-y-10">
            {roles.groups.map((group, index) => (
              <RoleList
                key={group.title ?? index}
                group={group}
                onApply={onApply}
              />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <Documents documents={documents} onApply={() => onApply()} />
        </aside>
      </div>
    </section>
  );
}

function RoleList({
  group,
  onApply,
}: {
  group: RoleGroup;
  onApply: (role: string) => void;
}) {
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-reveal={reveal}>
      {group.title && (
        <h3
          className={cn(
            "mb-4 text-lg font-semibold text-neutral-950",
            RISE_ON_REVEAL
          )}
        >
          {group.title}
        </h3>
      )}
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {group.roles.map((role, index) => (
          <li
            key={role.title}
            className={RISE_ON_REVEAL}
            style={delay(80 + Math.min(index, 10) * 50)}
          >
            <RoleRow role={role} onApply={onApply} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A job: its icon, title and, where jobs differ, its pay and what comes with it. The whole
 * row leads to the form; on hover its icon turns yellow and the arrow slides out.
 */
function RoleRow({
  role,
  onApply,
}: {
  role: Role;
  onApply: (role: string) => void;
}) {
  const { title, icon: Icon, salary, note } = role;

  return (
    <a
      href="#apply"
      onClick={(event) => {
        event.preventDefault();
        onApply(title);
      }}
      // The side padding (undone by the negative margin) gives the hover fill room
      className="group/role -mx-3 flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-300 outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-neutral-100 text-neutral-700 transition-[background-color,color,scale] duration-300 ease-out-quint group-hover/role:bg-brand group-hover/role:text-neutral-950 motion-safe:group-hover/role:scale-105">
        <Icon aria-hidden className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block leading-snug font-semibold text-pretty text-neutral-950 hyphens-auto wrap-break-word">
          {title}
        </span>
        {/* On phones the pay sits here, under the title, leaving the title room */}
        {(note || salary) && (
          <span
            className={cn(
              "mt-1 block text-sm leading-snug text-neutral-500",
              !note && "sm:hidden",
              fontInter.className
            )}
          >
            {salary && (
              <span className="font-semibold text-neutral-950 tabular-nums sm:hidden">
                {salary}
                {note && " · "}
              </span>
            )}
            {note}
          </span>
        )}
      </span>
      {salary && (
        <span className="shrink-0 rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold whitespace-nowrap text-neutral-950 tabular-nums ring-1 ring-brand/40 ring-inset max-sm:hidden">
          {salary}
        </span>
      )}
      <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-400 transition-colors duration-300 group-hover/role:text-neutral-950 group-focus-visible/role:text-neutral-950">
        <span className="max-sm:sr-only">Apply</span>
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-quint group-hover/role:translate-x-1"
        />
      </span>
    </a>
  );
}

/** What to send us, on a card that stays in view beside a long list of jobs */
function Documents({
  documents,
  onApply,
}: {
  documents: string[];
  onApply: () => void;
}) {
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={reveal}
      className={cn(
        "rounded-[2rem] bg-neutral-50 p-7 ring-1 ring-black/5 sm:p-9 lg:sticky lg:top-24",
        RISE_ON_REVEAL
      )}
      style={delay(150)}
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]">
        <FileCheck2 aria-hidden className="size-5" />
      </span>
      <h3 className="mt-6 text-xl font-semibold text-neutral-950 sm:text-2xl">
        Documents you need
      </h3>
      <ul
        className={cn(
          "mt-6 space-y-4 leading-relaxed text-neutral-700",
          fontInter.className
        )}
      >
        {documents.map((document, index) => (
          <li
            key={document}
            className={cn("flex gap-3", RISE_ON_REVEAL)}
            style={delay(250 + index * 60)}
          >
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-neutral-950 tabular-nums ring-1 ring-neutral-300">
              {index + 1}
            </span>
            <span className="min-w-0 text-pretty">{document}</span>
          </li>
        ))}
      </ul>
      <a
        href="#apply"
        onClick={(event) => {
          event.preventDefault();
          onApply();
        }}
        className={cn(PRIMARY_BUTTON, "mt-8 w-full")}
      >
        Start your application
        <ArrowRight aria-hidden className={BUTTON_ARROW} />
      </a>
    </div>
  );
}
