"use client";

import { useId } from "react";
import { BriefcaseBusiness, Mail, Phone, Send, X } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { MyForm } from "@/components/sections/MyForm";
import {
  EMAIL_LINK,
  PHONE_LINK,
  WHATSAPP_LABEL,
  WhatsAppLogo,
  whatsAppLink,
} from "@/components/layout/header-links";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import type { CountryJobs } from "./types";

interface ApplySectionProps {
  country: CountryJobs;
  /** The job chosen from the list, if any */
  role?: string;
  onClearRole: () => void;
}

/**
 * Where every "Apply" leads: an invitation on a dark panel, with the other ways to reach
 * us, beside the enquiry form. A job chosen from the list shows here, and the lead tells
 * our team which country and job it is about.
 */
export function ApplySection({
  country,
  role,
  onClearRole,
}: ApplySectionProps) {
  const { name, place, summary } = country;
  const titleId = useId();
  const formTitleId = useId();
  const [ref, reveal] = useReveal<HTMLDivElement>();
  const greeting = role
    ? `Hello, I am interested in the ${role} job in ${place}.`
    : `Hello, I am interested in jobs in ${place}.`;

  const contacts = [
    {
      icon: WhatsAppLogo,
      label: "WhatsApp",
      value: WHATSAPP_LABEL,
      href: whatsAppLink(greeting),
      external: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: PHONE_LINK.label,
      href: PHONE_LINK.href,
    },
    {
      icon: Mail,
      label: "Email",
      value: EMAIL_LINK.label,
      href: EMAIL_LINK.href,
    },
  ];

  return (
    <section
      id="apply"
      aria-labelledby={titleId}
      className="scroll-mt-20 bg-white px-4 pt-6 pb-20 sm:pt-10 sm:pb-24"
    >
      <div
        ref={ref}
        data-reveal={reveal}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <div className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-neutral-950 p-7 text-white reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none sm:p-10">
          {/* A soft yellow light from the lower corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgb(254_204_0/0.16),transparent_55%)]"
          />

          <Eyebrow className="text-white/60">Apply now</Eyebrow>
          <h2
            id={titleId}
            tabIndex={-1}
            className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance outline-none sm:text-5xl"
          >
            <WordReveal
              text={`Ready to work in ${place}?`}
              delay={150}
              stagger={60}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>
          <p
            className={cn(
              "mt-5 max-w-lg text-lg leading-relaxed text-pretty text-white/65",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(400)}
          >
            {summary ??
              `Send us your details and our team will get back to you within 24 hours to talk about the jobs in ${place} and your next steps.`}
          </p>

          {role && (
            <p
              className={cn(
                "mt-7 inline-flex max-w-full items-center gap-3 self-start rounded-2xl bg-white/[0.06] py-2 pr-2 pl-3 ring-1 ring-white/15",
                fontInter.className
              )}
            >
              <BriefcaseBusiness
                aria-hidden
                className="size-4 shrink-0 text-brand"
              />
              <span className="min-w-0 text-sm text-white/70">
                Applying for{" "}
                <strong className="font-semibold text-white">{role}</strong>
              </span>
              <button
                type="button"
                onClick={onClearRole}
                aria-label="Apply without a specific job"
                className="grid size-7 shrink-0 place-items-center rounded-full text-white/60 transition-colors duration-200 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X aria-hidden className="size-4" />
              </button>
            </p>
          )}

          <ul
            className={cn(
              "mt-auto grid grid-cols-1 gap-2 pt-10",
              fontInter.className
            )}
          >
            {contacts.map(
              ({ icon: Icon, label, value, href, external }, index) => (
                <li
                  key={label}
                  className={RISE_ON_REVEAL}
                  style={delay(550 + index * 80)}
                >
                  <a
                    href={href}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="group/contact flex items-center gap-4 rounded-2xl p-3 transition-colors duration-200 outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.06] text-brand ring-1 ring-white/10 transition-colors duration-300 group-hover/contact:bg-brand group-hover/contact:text-neutral-950">
                      <Icon aria-hidden className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                        {label}
                      </span>
                      <span className="block truncate font-medium text-white">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* The form's rows rise in one after another; until the form scrolls into view
            their entrance waits */}
        <div
          className={cn(
            "rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8 [&_.animate-rise]:reveal-waiting:[animation-play-state:paused]",
            RISE_ON_REVEAL
          )}
          style={delay(150)}
        >
          <div className="flex flex-col items-start gap-4 min-[360px]:flex-row">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]"
            >
              <Send className="size-5" />
            </span>
            <p
              id={formTitleId}
              className="text-lg leading-snug font-semibold text-neutral-950 sm:text-xl"
            >
              Fill out the form below and we’ll get back to you soon.
            </p>
          </div>

          <MyForm
            labelledBy={formTitleId}
            userType="jobseeker"
            enquiry={{
              subject: role
                ? `Enquiry: ${role} – Jobs in ${name}`
                : `Enquiry: Jobs in ${name}`,
              message: greeting.replace(/^Hello, /, ""),
            }}
            className="mt-7"
          />
        </div>
      </div>
    </section>
  );
}
