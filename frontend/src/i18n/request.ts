// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies(); // await the promise
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale = cookieLocale || 'bn'; // fallback

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
