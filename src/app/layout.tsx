// Tailwind CSS & SCSS
import 'src/styles/globals.scss';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// scripts
import Script from 'next/script';

// react-quill
import 'react-quill/dist/quill.snow.css';

// tiny-slider
import 'tiny-slider/dist/tiny-slider.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import Providers from 'src/components/providers/Providers';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// contexts
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';

// ----------------------------------------------------------------------

import type { Metadata } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://advisor.elizabethjudithmartinez.com';
const SITE_NAME = 'Elizabeth Judith Martinez';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Financial Advisor | Financial Services Representative`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Elizabeth Judith Martinez, Financial Services Representative with PFS Investments Inc., a Primerica-affiliated broker-dealer: expert guidance for secure financial futures. Specializing in Retirement Planning, Investing, Family Wealth, and Financial Wellness.',
  keywords: [
    'Elizabeth Judith Martinez',
    'Elizabeth Martinez',
    'Elizabeth Martinez financial advisor',
    'elizabethjudithmartinez',
    'advisor.elizabethjudithmartinez.com',
    'Financial Advisor',
    'Financial Consultant',
    'Financial Services Representative',
    'Financial Planning',
    'Wealth Management',
    'Investment Advice',
    'Investment Management',
    'Retirement Planning',
    'Retirement Income Strategies',
    '401(k) Rollover',
    'IRA Rollover',
    'College Savings Plans',
    'Education Funding',
    'Life Insurance',
    'Term Life Insurance',
    'Mutual Funds',
    'Variable Annuities',
    'Variable Contracts',
    'Investment Company Products',
    'Estate Planning',
    'Legacy Planning',
    'Debt Management',
    'Budgeting and Savings',
    'Financial Wellness',
    'Primerica',
    'PFS Investments',
    'Primerica financial advisor',
    'Financial Advisor California',
    'Financial Advisor Dublin CA',
    'Financial Advisor Bay Area',
    'Financial Advisor Colorado',
    'Financial Advisor Hawaii',
    'Financial Advisor Texas',
    'CRD 5887375',
    'FINRA registered advisor',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: `${SITE_NAME} | Financial Advisor`,
    description:
      'Elizabeth Judith Martinez: Expert guidance for secure financial futures. Specializing in Retirement Planning, Investing, Family Wealth, and Financial Wellness.',
    url: SITE_URL,
    images: [{ url: '/assets/images/elizabeth-judith-martinez.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/images/elizabeth-judith-martinez.jpg'],
    site: '@elizabethjudithmartinez',
    creator: '@elizabethjudithmartinez',
    title: `${SITE_NAME} | Financial Advisor`,
    description:
      'Expert guidance for secure financial futures. Specializing in Retirement Planning, Investing, and Family Wealth.',
  },
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
};

type Props = {
  children: React.ReactNode;
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Elizabeth Judith Martinez',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/images/elizabeth-judith-martinez.jpg`,
  email: 'mailto:elizabethjudithmartinez@gmail.com',
  telephone: '+1-949-297-6131',
  jobTitle: 'Financial Services Representative',
  worksFor: {
    '@type': 'Organization',
    name: 'PFS Investments Inc.',
    url: 'https://www.pfsinvestments.com',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6377 Clark Avenue, Suite 275',
    addressLocality: 'Dublin',
    addressRegion: 'CA',
    postalCode: '94568',
    addressCountry: 'US',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Script src="/js/easy_background.js" strategy="beforeInteractive" />
        <Script src="/js/feather.min.js" strategy="beforeInteractive" />
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light',
            themeDirection: 'ltr',
            themeContrast: 'default',
            themeLayout: 'vertical',
            themeColorPresets: 'blue',
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <CollapseDrawerProvider>
                <SettingsDrawer />
                <Providers>{children}</Providers>
                <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  theme="colored"
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </CollapseDrawerProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
        <Script id="feather-replace">{`if (typeof feather !== 'undefined') { feather.replace(); }`}</Script>
      </body>
    </html>
  );
}
