'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { type Locale , routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('LocaleSwitcher');

  return (
    <nav
      aria-label={t('label')}
      className="flex gap-1 rounded-full border border-zinc-200 bg-white/90 p-1 text-sm shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90"
    >
      {routing.locales.map((nextLocale) => 
        { return <Link
          key={nextLocale}
          href={pathname}
          locale={nextLocale}
          className={`rounded-full px-3 py-1 transition-colors ${
            locale === nextLocale
              ? 'bg-foreground text-background'
              : 'text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50'
          }`}
        >
          {t(nextLocale)}
        </Link> }
      )}
    </nav>
  );
}
