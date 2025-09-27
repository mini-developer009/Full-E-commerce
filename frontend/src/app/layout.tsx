import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "next-intl/server";
import { Hind_Siliguri, Noto_Sans, Noto_Sans_Bengali } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { EnvChecker, envErrors } from "@/components/others/env/EnvChecker";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { LoadingProgressBar } from "@/ptovider/ProgressLoding";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// Google Fonts
const notoSans = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"], // removed 'bengali' to avoid duplication
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: {
    default: "Inventory Management | Ullass ERP",
    template: "%s | Ullass ERP",
  },
  description: "Efficient inventory management system for modern businesses",
  metadataBase: new URL("https://ullass.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      bn: "/bn",
      ja: "/ja",
    },
  },
  keywords: [
    "Inventory Management",
    "ERP System",
    "Stock Control",
    "Ullass ERP",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ullass.com",
    siteName: "Ullass ERP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ullass ERP Inventory Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ullass_erp",
    creator: "@ullass_erp",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const locale = params.locale || (await getLocale());

  const fontVariables = [
    geistSans.variable,
    geistMono.variable,
    notoSans.variable,
    notoSansBengali.variable,
    hindSiliguri.variable,
  ].join(" ");

  if (envErrors.length > 0) {
    return (
      <html lang={locale}>
        <body className={`${fontVariables} font-sans antialiased`}>
          <EnvChecker />
        </body>
      </html>
    );
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontVariables} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale}>
            <LoadingProgressBar>
              {children}
            </LoadingProgressBar>
            <Toaster
              position="top-right"
              toastOptions={{ duration: 3000 }}
              richColors
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
