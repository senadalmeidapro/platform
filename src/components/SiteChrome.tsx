import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  ChevronDown,
  Clock3,
  Globe2,
  Mail,
  Menu,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { company } from '../config/company';
import { t } from '../content';
import { productCategories, products, services } from '../data/catalog';
import { Brand } from './Brand';
import { ServiceIcon } from './ServiceIcon';
import { ImageFrame } from './ImageFrame';

const navigation = [
  { label: 'nav.about', to: '/about' },
  { label: 'nav.faq', to: '/faq' },
  { label: 'nav.contact', to: '/contact' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `nav__link ${isActive ? 'is-active' : ''}`;
const mobileClass = ({ isActive }: { isActive: boolean }) =>
  `mobile-nav__link ${isActive ? 'active' : ''}`;

type MegaCategory = 'services' | 'products';

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState<MegaCategory | null>(null);
  const [previewItemId, setPreviewItemId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const productsTrigger = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const serviceRouteActive = pathname.startsWith('/services');
  const productsRouteActive = pathname.startsWith('/products');

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setActive(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (active === 'services') servicesTrigger.current?.focus();
      if (active === 'products') productsTrigger.current?.focus();
      setActive(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  const serviceItems = services.map((service) => ({
    id: service.id,
    title: t(`services.items.${service.id}.title`),
    description: t(`services.items.${service.id}.short`),
    href: `/services/${service.slug}`,
    image: service.image,
    imageAlt: t(`services.items.${service.id}.imageAlt`),
    icon: <ServiceIcon name={service.icon} />,
  }));

  const productItems = productCategories.map((category) => {
    const product = products.find((item) => item.category === category);
    return {
      id: category,
      title: t(`products.categories.${category}`),
      description: product ? t(product.description) : t('products.description'),
      href: `/products?category=${category}`,
      image: product?.image,
      imageAlt: t(`productImages.${category}`),
      icon: null,
    };
  });

  const selectedItems = active === 'products' ? productItems : serviceItems;
  const previewItem = selectedItems.find((item) => item.id === previewItemId);
  const featuredProduct = products[0];
  const featuredService = services.find((service) => service.id === 'networkInstallation');
  const defaultFeature =
    active === 'products'
      ? {
          title: featuredProduct ? t(featuredProduct.title) : t('nav.products'),
          description: featuredProduct ? t(featuredProduct.description) : t('products.description'),
          image: featuredProduct?.image ?? '',
          imageAlt: featuredProduct
            ? t(`productImages.${featuredProduct.category}`)
            : t('nav.products'),
          href: featuredProduct ? `/request-quote?product=${featuredProduct.id}` : '/products',
          eyebrow: t('products.kicker'),
          action: t('products.askForEquipment'),
        }
      : {
          title: featuredService
            ? t(`services.items.${featuredService.id}.title`)
            : t('nav.services'),
          description: featuredService
            ? t(`services.items.${featuredService.id}.short`)
            : t('services.overview.description'),
          image: featuredService?.image ?? '',
          imageAlt: featuredService
            ? t(`services.items.${featuredService.id}.imageAlt`)
            : t('nav.services'),
          href: featuredService ? `/services/${featuredService.slug}` : '/services',
          eyebrow: t('services.groups.kicker'),
          action: t('common.learnMore'),
        };
  const featured = previewItem
    ? {
        title: previewItem.title,
        description: previewItem.description,
        image: previewItem.image ?? defaultFeature.image,
        imageAlt: previewItem.imageAlt,
        href: previewItem.href,
        eyebrow: defaultFeature.eyebrow,
        action: active === 'products' ? t('products.askForEquipment') : t('common.learnMore'),
      }
    : defaultFeature;

  const toggle = (category: MegaCategory) => {
    setPreviewItemId(null);
    setActive((current) => (current === category ? null : category));
  };

  return (
    <div className="mega-nav" ref={rootRef}>
      <button
        aria-controls="site-mega-menu"
        aria-expanded={active === 'services'}
        aria-haspopup="true"
        className={`nav__link mega-nav__trigger ${serviceRouteActive || active === 'services' ? 'is-active' : ''}`}
        onClick={() => toggle('services')}
        ref={servicesTrigger}
        type="button"
      >
        {t('nav.services')} <ChevronDown aria-hidden="true" size={15} />
      </button>
      <button
        aria-controls="site-mega-menu"
        aria-expanded={active === 'products'}
        aria-haspopup="true"
        className={`nav__link mega-nav__trigger ${productsRouteActive || active === 'products' ? 'is-active' : ''}`}
        onClick={() => toggle('products')}
        ref={productsTrigger}
        type="button"
      >
        {t('nav.products')} <ChevronDown aria-hidden="true" size={15} />
      </button>
      <AnimatePresence mode="wait">
        {active && (
          <motion.section
            aria-label={active === 'products' ? t('nav.products') : t('nav.services')}
            className="mega-menu"
            id="site-mega-menu"
            key={active}
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="mega-menu__main">
              <header className="mega-menu__heading">
                <p className="eyebrow">
                  {active === 'products' ? t('products.kicker') : t('services.overview.kicker')}
                </p>
                <h2>{active === 'products' ? t('nav.products') : t('nav.services')}</h2>
                <p>
                  {active === 'products'
                    ? t('products.description')
                    : t('services.overview.description')}
                </p>
              </header>
              <div
                className={`mega-menu__items ${active === 'products' ? 'mega-menu__items--products' : ''}`}
                onMouseLeave={() => setPreviewItemId(null)}
              >
                {selectedItems.map((item) => (
                  <Link
                    className="mega-menu__item"
                    key={item.id}
                    onClick={onNavigate}
                    onFocus={() => setPreviewItemId(item.id)}
                    onMouseEnter={() => setPreviewItemId(item.id)}
                    to={item.href}
                  >
                    {item.image ? (
                      <ImageFrame alt="" className="mega-menu__thumb" src={item.image} />
                    ) : (
                      <span aria-hidden="true" className="mega-menu__icon">
                        {item.icon}
                      </span>
                    )}
                    <span className="mega-menu__item-copy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <ArrowRight aria-hidden="true" className="mega-menu__arrow" size={15} />
                  </Link>
                ))}
              </div>
              <Link
                className="mega-menu__all"
                onClick={onNavigate}
                to={active === 'products' ? '/products' : '/services'}
              >
                {active === 'products' ? t('products.title') : t('common.allServices')}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <aside className="mega-menu__feature">
              <ImageFrame
                alt={featured.imageAlt}
                className="mega-menu__feature-image"
                key={featured.image}
                src={featured.image}
              />
              <div className="mega-menu__feature-content">
                <p className="eyebrow">{featured.eyebrow}</p>
                <h3>{featured.title}</h3>
                <p>{featured.description}</p>
                <Link onClick={onNavigate} to={featured.href}>
                  {featured.action} <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </aside>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<MegaCategory | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className={`header on-dark ${scrolled || mobileOpen ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Brand onNavigate={closeMobileMenu} />
        <nav aria-label={t('nav.primary')} className="nav">
          <MegaMenu onNavigate={closeMobileMenu} />
          {navigation.map((item) => (
            <NavLink className={navClass} key={item.to} onClick={closeMobileMenu} to={item.to}>
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Link className="btn btn--primary" onClick={closeMobileMenu} to="/request-quote">
            {t('nav.requestQuote')}
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="menu-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav aria-label={t('nav.mobile')} className="mobile-nav" id="mobile-navigation">
          <NavLink className={mobileClass} end onClick={closeMobileMenu} to="/">
            {t('nav.home')}
          </NavLink>
          <button
            aria-controls="mobile-services-submenu"
            aria-expanded={mobileExpanded === 'services'}
            className="mobile-nav__link"
            onClick={() => setMobileExpanded((value) => (value === 'services' ? null : 'services'))}
            type="button"
          >
            {t('nav.services')}
            <ChevronDown
              aria-hidden="true"
              size={18}
              style={{ transform: mobileExpanded === 'services' ? 'rotate(180deg)' : undefined }}
            />
          </button>
          {mobileExpanded === 'services' && (
            <div className="mobile-nav__sub" id="mobile-services-submenu">
              <Link onClick={closeMobileMenu} to="/services">
                {t('common.allServices')}
              </Link>
              {services.map((service) => (
                <Link key={service.id} onClick={closeMobileMenu} to={`/services/${service.slug}`}>
                  {t(`services.items.${service.id}.title`)}
                </Link>
              ))}
            </div>
          )}
          <button
            aria-controls="mobile-products-submenu"
            aria-expanded={mobileExpanded === 'products'}
            className="mobile-nav__link"
            onClick={() => setMobileExpanded((value) => (value === 'products' ? null : 'products'))}
            type="button"
          >
            {t('nav.products')}
            <ChevronDown
              aria-hidden="true"
              size={18}
              style={{ transform: mobileExpanded === 'products' ? 'rotate(180deg)' : undefined }}
            />
          </button>
          {mobileExpanded === 'products' && (
            <div className="mobile-nav__sub" id="mobile-products-submenu">
              <Link onClick={closeMobileMenu} to="/products">
                {t('products.title')}
              </Link>
              {productCategories.map((category) => (
                <Link
                  key={category}
                  onClick={closeMobileMenu}
                  to={`/products?category=${category}`}
                >
                  {t(`products.categories.${category}`)}
                </Link>
              ))}
            </div>
          )}
          {navigation.map((item) => (
            <NavLink className={mobileClass} key={item.to} onClick={closeMobileMenu} to={item.to}>
              {t(item.label)}
            </NavLink>
          ))}
          <Link
            className="btn btn--primary btn--lg btn--block"
            onClick={closeMobileMenu}
            to="/request-quote"
          >
            {t('nav.requestQuote')}
          </Link>
        </nav>
      )}
    </header>
  );
}

function ContactLine({
  icon: Icon,
  value,
  href,
  fallback,
}: {
  icon: typeof Phone;
  value: string;
  href?: string;
  fallback: string;
}) {
  return (
    <span className="footer__contact">
      <Icon aria-hidden="true" size={16} />
      {value ? <a href={href}>{value}</a> : fallback}
    </span>
  );
}

export function Footer() {
  const socialLinks = [
    { href: company.social.facebook, label: 'Facebook', icon: Globe2 },
    { href: company.social.linkedin, label: 'LinkedIn', icon: BriefcaseBusiness },
    { href: company.social.instagram, label: 'Instagram', icon: Camera },
  ].filter((item) => item.href);

  return (
    <footer className="footer on-dark">
      <div className="container footer__main">
        <div className="footer__brand">
          <Brand inverse />
          <p>{t('footer.description')}</p>
          {socialLinks.length > 0 && (
            <div className="footer__socials">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="footer__col">
          <h2>{t('footer.company')}</h2>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/products">{t('nav.products')}</Link>
          <Link to="/faq">{t('nav.faq')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </div>
        <div className="footer__col">
          <h2>{t('nav.services')}</h2>
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.slug}`}>
              {t(`services.items.${service.id}.title`)}
            </Link>
          ))}
        </div>
        <div className="footer__col">
          <h2>{t('footer.contact')}</h2>
          <ContactLine
            fallback={t('contact.detailsAvailable')}
            href={`tel:${company.phone}`}
            icon={Phone}
            value={company.phone}
          />
          <ContactLine
            fallback={t('contact.detailsAvailable')}
            href={`mailto:${company.email}`}
            icon={Mail}
            value={company.email}
          />
          <ContactLine
            fallback={t('contact.hoursAvailable')}
            icon={Clock3}
            value={company.businessHours}
          />
          <ContactLine
            fallback={t('contact.locationAvailable')}
            icon={MapPin}
            value={company.address}
          />
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {company.name}. {t('footer.rights')}
        </p>
        <div>
          <Link to="/privacy-policy">{t('footer.privacy')}</Link>
          <Link to="/terms">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}

export function QuickContact() {
  const message = encodeURIComponent(t('contact.whatsappMessage'));
  const hasWhatsapp = Boolean(company.whatsapp);
  const href = hasWhatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${message}`
    : '/contact#contact-details';
  const label = hasWhatsapp ? t('contact.whatsapp') : t('contact.quickContact');
  return (
    <a
      aria-label={label}
      className="quick-contact"
      href={href}
      rel={hasWhatsapp ? 'noreferrer' : undefined}
      target={hasWhatsapp ? '_blank' : undefined}
    >
      <MessageCircle aria-hidden="true" size={20} />
      <span>{label}</span>
    </a>
  );
}

export function SiteLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
