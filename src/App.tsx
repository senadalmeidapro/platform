import { lazy, Suspense, useEffect } from 'react';
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
const ComputerMaintenancePage = lazy(() =>
  import('./pages/services/ComputerMaintenancePage').then((m) => ({
    default: m.ComputerMaintenancePage,
  })),
);
const EquipmentInstallationPage = lazy(() =>
  import('./pages/services/EquipmentInstallationPage').then((m) => ({
    default: m.EquipmentInstallationPage,
  })),
);
const NetworkInstallationPage = lazy(() =>
  import('./pages/services/NetworkInstallationPage').then((m) => ({
    default: m.NetworkInstallationPage,
  })),
);
const VideoSurveillancePage = lazy(() =>
  import('./pages/services/VideoSurveillancePage').then((m) => ({
    default: m.VideoSurveillancePage,
  })),
);
const ITSupportPage = lazy(() =>
  import('./pages/services/ITSupportPage').then((m) => ({ default: m.ITSupportPage })),
);
const EquipmentSalesPage = lazy(() =>
  import('./pages/services/EquipmentSalesPage').then((m) => ({ default: m.EquipmentSalesPage })),
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
      <ScrollToTop />
      <Suspense
        fallback={<div aria-label="Chargement de la page" className="page-loading" role="status" />}
      >
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/computer-maintenance" element={<ComputerMaintenancePage />} />
            <Route path="services/equipment-installation" element={<EquipmentInstallationPage />} />
            <Route path="services/network-installation" element={<NetworkInstallationPage />} />
            <Route path="services/video-surveillance" element={<VideoSurveillancePage />} />
            <Route path="services/it-support" element={<ITSupportPage />} />
            <Route path="services/it-equipment-sales" element={<EquipmentSalesPage />} />
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
