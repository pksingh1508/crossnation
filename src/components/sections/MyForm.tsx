"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Flag from "react-country-flag";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countryData from "@/constants/countrycode.json";
import { fontInter } from "@/fonts";
import { delay } from "@/lib/animation";
import { FLAG_CDN } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { trackConversion } from "@/utils/gtag";

interface CountryCode {
  country: string;
  code: string;
  iso: string;
}

// Until the visitor's country is known
const DEFAULT_COUNTRY: CountryCode =
  countryData.find((c) => c.iso === "US") ?? countryData[0];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  userType: "",
  acceptTerms: false,
};

const USER_TYPES = ["jobseeker", "agent", "employer"] as const;

const TOAST_STYLE = {
  borderRadius: "10px",
  background: "#fecc00",
  color: "#111827",
};

// The rows rise into place one after another, after the card around them
const RISE = "animate-rise motion-reduce:animate-none";

// A field is a soft grey well; while it has focus it turns white, with a dark edge and a
// yellow glow. The phone number's box has the same look, see PHONE_BOX.
const FIELD = cn(
  "h-12 rounded-xl border-neutral-200 bg-neutral-50 px-4 text-ellipsis text-neutral-950 shadow-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-neutral-400 hover:border-neutral-300 focus-visible:border-neutral-950 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand/30",
  fontInter.className
);

const PHONE_BOX = cn(
  "flex h-12 items-center rounded-xl border border-neutral-200 bg-neutral-50 transition-[border-color,background-color,box-shadow] duration-200 hover:border-neutral-300 focus-within:border-neutral-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/30",
  fontInter.className
);

// The two drop-down menus
const MENU =
  "rounded-xl border-neutral-200 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)]";
const MENU_ITEM = cn(
  "rounded-lg py-2 focus:bg-neutral-100",
  fontInter.className
);

interface FieldProps {
  label: string;
  /** The id of the control the label names; the label's own id is this plus "-label" */
  htmlFor: string;
  /** When the row's entrance animation starts, in ms */
  start: number;
  children: ReactNode;
}

/** A labelled row. Every field is required, which the asterisk shows. */
function Field({ label, htmlFor, start, children }: FieldProps) {
  return (
    <div
      className={cn("grid grid-cols-1 content-start gap-2", RISE)}
      style={delay(start)}
    >
      <label
        id={`${htmlFor}-label`}
        htmlFor={htmlFor}
        className="text-sm font-medium text-neutral-800"
      >
        {label}
        <span aria-hidden className="ml-0.5 text-red-500">
          *
        </span>
      </label>
      {children}
    </div>
  );
}

interface MyFormProps {
  /** The id of the text that names the form */
  labelledBy?: string;
  className?: string;
}

/**
 * The enquiry form at the top of CommonContact; it sends the lead to the CRM. Its rows
 * animate in with the page, so it belongs at the top of a page.
 */
export function MyForm({ labelledBy, className }: MyFormProps) {
  const locale = useLocale();
  const t = useTranslations("pages.myForm");
  const id = useId();
  const [detectedCountry, setDetectedCountry] =
    useState<CountryCode>(DEFAULT_COUNTRY);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryCode>(DEFAULT_COUNTRY);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  // The role menu isn't checked by the browser like the other fields, so it is marked here
  const roleRef = useRef<HTMLButtonElement>(null);
  const [roleMissing, setRoleMissing] = useState(false);

  // Preselect the visitor's country code, found from their IP address
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = countryData.find((c) => c.iso === data?.country_code);
        if (country) {
          setDetectedCountry(country);
          setSelectedCountry(country);
        }
      })
      // Blocked or offline: the default stays
      .catch(() => {});
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData(EMPTY_FORM);
    setSelectedCountry(detectedCountry); // reset to detected country, not hardcoded "US"
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // The browser checks the fields first; this catches what it can't, the role menu
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.userType ||
      !formData.acceptTerms
    ) {
      if (!formData.userType) {
        setRoleMissing(true);
        roleRef.current?.focus();
      }
      toast.error(t("errorMessage"), { style: TOAST_STYLE });
      return;
    }

    // Set loading to true when starting the API call
    setLoading(true);

    // try to send data to Zoho CRM
    try {
      const res = await axios.post("/api/post-lead", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `${selectedCountry.code} ${formData.phone}`,
        option: formData.userType,
        subject: "Enquiry : Know More About Your Services",
        message: "I am filling this form to know more about your serwis.",
      });
      if (res.status === 200 || res.status === 201) {
        clearForm();
        toast.success(t("successMessage"), { style: TOAST_STYLE });
        // 🔥 Track Google Ads conversion
        trackConversion("vr3RCMqi8NAbEOOJyJtC", 1.0, "PLN");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form", { style: TOAST_STYLE });
    } finally {
      // Set loading to false when API call completes (success or error)
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={labelledBy}
      className={cn("grid grid-cols-1 gap-5", className)}
    >
      {/* Side by side where the card is wide enough for the longest placeholders */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Field label={t("firstName")} htmlFor={`${id}-first`} start={400}>
          <Input
            id={`${id}-first`}
            autoComplete="given-name"
            spellCheck={false}
            placeholder={t("firstNamePlaceholder")}
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={FIELD}
            required
          />
        </Field>

        <Field label={t("lastName")} htmlFor={`${id}-last`} start={460}>
          <Input
            id={`${id}-last`}
            autoComplete="family-name"
            spellCheck={false}
            placeholder={t("lastNamePlaceholder")}
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={FIELD}
            required
          />
        </Field>
      </div>

      <Field label={t("email")} htmlFor={`${id}-email`} start={520}>
        <Input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={FIELD}
          required
        />
      </Field>

      <Field label={t("phoneNumber")} htmlFor={`${id}-phone`} start={580}>
        {/* The country code and the number share one box */}
        <div className={PHONE_BOX}>
          <Select
            value={selectedCountry.iso}
            onValueChange={(value) => {
              const country = countryData.find((c) => c.iso === value);
              if (country) setSelectedCountry(country);
            }}
          >
            {/* Read out as "Phone Number +48" */}
            <SelectTrigger
              id={`${id}-code`}
              aria-labelledby={`${id}-phone-label ${id}-code`}
              className="h-full gap-1.5 rounded-l-xl rounded-r-none border-0 bg-transparent pr-2 pl-3 text-base text-neutral-950 tabular-nums shadow-none focus-visible:ring-0 data-[size=default]:h-full md:text-sm"
            >
              <SelectValue>
                <span className="flex items-center gap-2">
                  <Flag
                    svg
                    countryCode={selectedCountry.iso}
                    cdnUrl={FLAG_CDN}
                    alt=""
                    className="rounded-full ring-1 ring-black/10"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                  {selectedCountry.code}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start" className={cn(MENU, "max-h-72 w-72")}>
              {countryData.map((country) => (
                // textValue: typing a country's name jumps to it
                <SelectItem
                  key={country.iso}
                  value={country.iso}
                  textValue={country.country}
                  className={MENU_ITEM}
                >
                  <Flag
                    svg
                    countryCode={country.iso}
                    cdnUrl={FLAG_CDN}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="rounded-full ring-1 ring-black/10"
                    style={{ width: "1.125rem", height: "1.125rem" }}
                  />
                  <span className="w-14 shrink-0 text-neutral-950 tabular-nums">
                    {country.code}
                  </span>
                  <span className="truncate text-neutral-500">
                    {country.country.split("(")[0].trim()}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span aria-hidden className="h-6 w-px shrink-0 bg-neutral-200" />

          <Input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel-national"
            placeholder={t("phonePlaceholder")}
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="h-full min-w-0 flex-1 rounded-l-none rounded-r-xl border-0 bg-transparent px-3 text-ellipsis text-neutral-950 shadow-none placeholder:text-neutral-400 focus-visible:ring-0"
            required
          />
        </div>
      </Field>

      <Field label={t("userType")} htmlFor={`${id}-role`} start={640}>
        {/* Its edge turns red when the form is sent without a role */}
        <Select
          value={formData.userType}
          onValueChange={(value) => {
            handleInputChange("userType", value);
            setRoleMissing(false);
          }}
        >
          <SelectTrigger
            ref={roleRef}
            id={`${id}-role`}
            aria-invalid={roleMissing || undefined}
            className={cn(
              FIELD,
              "w-full text-base data-[placeholder]:text-neutral-400 data-[size=default]:h-12 md:text-sm"
            )}
          >
            <SelectValue placeholder={t("userTypePlaceholder")} />
          </SelectTrigger>
          <SelectContent className={MENU}>
            {USER_TYPES.map((type) => (
              <SelectItem key={type} value={type} className={MENU_ITEM}>
                {t(`userTypes.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div
        className={cn(
          "flex items-start gap-3 text-sm leading-relaxed text-neutral-600",
          fontInter.className,
          RISE
        )}
        style={delay(700)}
      >
        {/* A drawn checkbox: it fills dark and a yellow tick pops in */}
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input
            type="checkbox"
            id={`${id}-terms`}
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
            className="peer size-5 cursor-pointer appearance-none rounded-md border border-neutral-300 bg-white transition-[background-color,border-color,box-shadow] duration-200 outline-none checked:border-neutral-950 checked:bg-neutral-950 hover:border-neutral-400 checked:hover:border-neutral-950 focus-visible:ring-4 focus-visible:ring-brand/40"
            required
          />
          <Check
            aria-hidden
            strokeWidth={3}
            className="pointer-events-none absolute size-3.5 scale-50 text-brand opacity-0 transition-[opacity,scale] duration-300 ease-out-quint peer-checked:scale-100 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={`${id}-terms`} className="cursor-pointer">
          {t("termsText")}{" "}
          <a
            href={getLocalizedPath(locale, "/terms-conditions")}
            className="rounded-sm font-medium text-neutral-950 underline decoration-brand decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("termsLink")}
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "group relative mt-1 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-6 text-[15px] font-semibold text-neutral-950 shadow-[0_10px_24px_-12px_rgba(254,204,0,0.95)] transition-[translate,box-shadow,opacity] duration-300 ease-out outline-none hover:shadow-[0_16px_32px_-14px_rgba(254,204,0,1)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 motion-safe:hover:-translate-y-0.5",
          RISE
        )}
        style={delay(760)}
      >
        {/* A light sheen sweeps across on hover, as on the navbar's booking button */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
        />
        {loading && (
          <LoaderCircle aria-hidden className="relative size-4 animate-spin" />
        )}
        <span className="relative">
          {loading ? t("loadingMessage") : t("submitButton")}
        </span>
        {!loading && (
          <ArrowRight
            aria-hidden
            className="relative size-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1"
          />
        )}
      </button>
    </form>
  );
}
