import { lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation } from 'react-router';
import { SiteLayout } from './components/SiteChrome';
const HomePage = lazy(() =>
  import('./pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })),
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })),
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((module) => ({ default: module.ProductsPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })),
);
const QuotePage = lazy(() =>
  import('./pages/QuotePage').then((module) => ({ default: module.QuotePage })),
);
const FAQPage = lazy(() =>
  import('./pages/FAQPage').then((module) => ({ default: module.FAQPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/LegalPages').then((module) => ({ default: module.PrivacyPolicyPage })),
);
const TermsPage = lazy(() =>
  import('./pages/LegalPages').then((module) => ({ default: module.TermsPage })),
);

function LanguageDocumentSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = (i18n.resolvedLanguage ?? i18n.language).split('-')[0] ?? 'fr';
  }, [i18n, i18n.language, i18n.resolvedLanguage]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <LanguageDocumentSync />
      <ScrollToTop />
      <Suspense fallback={<div aria-label="Loading page" className="page-loading" role="status" />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="request-quote" element={<QuotePage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
