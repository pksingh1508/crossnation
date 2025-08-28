'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { siteConfig } from '@/constants/site';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Navigate to the new locale
    if (newLocale === siteConfig.defaultLanguage) {
      router.push(pathWithoutLocale);
    } else {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    }
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {siteConfig.supportedLanguages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {lang === 'en' ? 'English' : 'Español'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
