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

// react-quill
import 'react-quill/dist/quill.snow.css';

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

export const metadata: Metadata = {
  title: {
    default: 'Elizabeth Judith Martinez | Dashboard',
    template: '%s | Elizabeth Judith Martinez',
  },
  robots: { index: false, follow: false },
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
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
      </body>
    </html>
  );
}
