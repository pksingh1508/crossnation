import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Mock next-intl
jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/en",
}));

describe("LanguageSwitcher", () => {
  it("renders language options", () => {
    render(<LanguageSwitcher />);

    // Should show the current language
    expect(screen.getByText("en")).toBeInTheDocument();
  });
});
