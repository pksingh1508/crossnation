"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Flag from "react-country-flag";
import countryData from "@/constants/countrycode.json";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { fontInter, fontPoppins } from "@/fonts";

interface CountryCode {
  country: string;
  code: string;
  iso: string;
}

export function MyForm() {
  const locale = useLocale();
  const t = useTranslations("pages.myForm");
  const [detectedCountry, setDetectedCountry] = useState<CountryCode>(
    countryData.find((c) => c.iso === "US") || countryData[0]
  );
  const [selectedCountry, setSelectedCountry] =
    useState<CountryCode>(detectedCountry);

  // useEffect for auto-detect the country
  React.useEffect(() => {
    // Detect country via IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          const userCountry =
            countryData.find((c) => c.iso === data.country_code) ||
            detectedCountry;
          setDetectedCountry(userCountry);
          setSelectedCountry(userCountry);
        }
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "",
      acceptTerms: false,
    });
    setSelectedCountry(detectedCountry); // reset to detected country, not hardcoded "US"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.userType ||
      !formData.acceptTerms
    ) {
      console.error(t("errorMessage"));
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
      console.log("data", res);
      if (res.status === 200 || res.status === 201) {
        clearForm();
        // window.alert(t("successMessage"));
        toast.success(t("successMessage"), {
          style: {
            borderRadius: "10px",
            background: "#fecc00",
            color: "#111827",
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form", {
        style: {
          borderRadius: "10px",
          background: "#fecc00",
          color: "#111827",
        },
      });
    } finally {
      // Set loading to false when API call completes (success or error)
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField label={t("firstName")} required>
            <div className="font-inter">
              <Input
                placeholder={t("firstNamePlaceholder")}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`focus-visible:ring-yellow-500 focus-visible:border-yellow-500 font-inter focus-visible:ring-[2px] ${fontInter.className}`}
                required
              />
            </div>
          </FormField>

          <FormField label={t("lastName")} required>
            <div className="font-inter">
              <Input
                placeholder={t("lastNamePlaceholder")}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`focus-visible:ring-yellow-500 focus-visible:border-yellow-500 font-inter focus-visible:ring-[2px] ${fontInter.className}`}
                required
              />
            </div>
          </FormField>
        </div>

        <FormField label={t("email")} required>
          <div className="font-inter">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`focus-visible:ring-yellow-500 focus-visible:border-yellow-500 font-inter focus-visible:ring-[2px] ${fontInter.className}`}
              required
            />
          </div>
        </FormField>

        <FormField label={t("phoneNumber")} required>
          <div className="font-inter">
            <div className="flex gap-2 md:flex-row flex-col">
              <Select
                value={selectedCountry.iso}
                onValueChange={(value) => {
                  const country = countryData.find((c) => c.iso === value);
                  if (country) setSelectedCountry(country);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Flag
                        countryCode={selectedCountry.iso}
                        svg
                        style={{ width: "16px", height: "12px" }}
                      />
                      <span className="text-sm">{selectedCountry.code}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryData.map((country) => (
                    <SelectItem key={country.iso} value={country.iso}>
                      <div className="flex items-center gap-2">
                        <Flag
                          countryCode={country.iso}
                          svg
                          style={{ width: "16px", height: "12px" }}
                        />
                        <span className="text-sm">{country.code}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {country.country.split("(")[0].trim()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="tel"
                placeholder={t("phonePlaceholder")}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`flex-1 font-inter ${fontInter.className}`}
                required
              />
            </div>
          </div>
        </FormField>

        <FormField label={t("userType")} required>
          <div className="font-inter">
            <Select
              value={formData.userType}
              onValueChange={(value) => handleInputChange("userType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("userTypePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jobseeker">
                  {t("userTypes.jobseeker")}
                </SelectItem>
                <SelectItem value="agent">{t("userTypes.agent")}</SelectItem>
                <SelectItem value="employer">
                  {t("userTypes.employer")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormField>

        <div className="flex items-start gap-3 font-inter">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
            className={`mt-1 h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 ${fontInter.className}`}
            required
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {t("termsText")}{" "}
            <a
              href={`/${locale}/terms-conditions`}
              className="text-yellow-600 hover:text-yellow-700 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("termsLink")}
            </a>
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`w-full font-montserrat font-semibold cursor-pointer  hover:bg-yellow-400 hover:text-black hover:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed ${fontPoppins.className}`}
          variant="brandOutline"
        >
          {loading ? t("loadingMessage") : t("submitButton")}
        </Button>
      </form>
    </div>
  );
}
