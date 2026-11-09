import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Camera,
  BriefcaseBusiness,
  Globe2,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { company } from '../config/company';
import { services } from '../data/catalog';
import { LanguageSelector } from '../shared/components/LanguageSelector';
import { Brand } from './Brand';
import { ServiceIcon } from './ServiceIcon';

const navigation = [
  { label: 'nav.about', to: '/about' },
  { label: 'nav.products', to: '/products' },
  { label: 'nav.faq', to: '/faq' },
  { label: 'nav.contact', to: '/contact' },
];

function ServicesMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="services-menu" ref={ref}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        className={`nav-link services-menu__trigger ${location.pathname.startsWith('/services') ? 'is-active' : ''}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {t('nav.services')}{' '}
        <ChevronDown aria-hidden="true" className={open ? 'rotate-180' : ''} size={15} />
      </button>
      {open && (
        <div className="services-menu__panel">
          <div className="services-menu__intro">
            <span>{t('nav.services')}</span>
            <Link
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              to="/services"
            >
              {t('common.viewAll')}
            </Link>
          </div>
          {services.map((service) => (
            <Link
              className="services-menu__item"
              key={service.id}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              to={`/services/${service.slug}`}
            >
              <span className="services-menu__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <span>
                <strong>{t(`services.items.${service.id}.title`)}</strong>
                <small>{t(`services.items.${service.id}.short`)}</small>
              </span>
              <ArrowUpRight aria-hidden="true" className="services-menu__arrow" size={15} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updateScroll() {
      setScrolled(window.scrollY > 12);
    }
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Brand />
        <nav aria-label={t('nav.primary')} className="desktop-nav">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            end
            to="/"
          >
            {t('nav.home')}
          </NavLink>
          <ServicesMenu />
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              key={item.to}
              to={item.to}
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageSelector />
          <Link className="button button--primary button--header" to="/request-quote">
            {t('nav.requestQuote')} <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          <button
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="menu-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-nav-wrap">
          <nav aria-label={t('nav.mobile')} className="mobile-nav" id="mobile-navigation">
            <NavLink className="mobile-nav__link" end onClick={() => setMobileOpen(false)} to="/">
              {t('nav.home')}
            </NavLink>
            <button
              aria-expanded={mobileServicesOpen}
              className="mobile-nav__link mobile-nav__service-trigger"
              onClick={() => setMobileServicesOpen((value) => !value)}
              type="button"
            >
              {t('nav.services')}{' '}
              <ChevronDown
                aria-hidden="true"
                className={mobileServicesOpen ? 'rotate-180' : ''}
                size={17}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mobile-nav__subnav">
                <Link onClick={() => setMobileOpen(false)} to="/services">
                  {t('common.allServices')}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    onClick={() => setMobileOpen(false)}
                    to={`/services/${service.slug}`}
                  >
                    {t(`services.items.${service.id}.title`)}
                  </Link>
                ))}
              </div>
            )}
            {navigation.map((item) => (
              <NavLink
                className="mobile-nav__link"
                key={item.to}
                onClick={() => setMobileOpen(false)}
                to={item.to}
              >
                {t(item.label)}
              </NavLink>
            ))}
            <div className="mobile-nav__bottom">
              <LanguageSelector />
              <Link
                className="button button--primary"
                onClick={() => setMobileOpen(false)}
                to="/request-quote"
              >
                {t('nav.requestQuote')} <ArrowUpRight size={17} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function ContactValue({
  href,
  icon: Icon,
  value,
}: {
  href?: string;
  icon: typeof Phone;
  value?: string;
}) {
  const { t } = useTranslation();
  if (!value)
    return (
      <span className="footer-contact__item">
        <Icon aria-hidden="true" size={16} />
        {t('contact.detailsAvailable')}
      </span>
    );
  return (
    <a className="footer-contact__item" href={href}>
      <Icon aria-hidden="true" size={16} />
      {value}
    </a>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const serviceLinks = services.map((service) => ({
    ...service,
    label: t(`services.items.${service.id}.title`),
  }));
  const socialLinks = [
    { href: company.social.facebook, label: 'Facebook', icon: Globe2 },
    { href: company.social.linkedin, label: 'LinkedIn', icon: BriefcaseBusiness },
    { href: company.social.instagram, label: 'Instagram', icon: Camera },
  ].filter((item) => item.href);

  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <div className="footer-brand-column">
          <Brand inverse />
          <p>{t('footer.description')}</p>
          <div className="footer-socials">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h2>{t('footer.company')}</h2>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/services">{t('nav.services')}</Link>
          <Link to="/products">{t('nav.products')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          <Link to="/faq">{t('nav.faq')}</Link>
        </div>
        <div className="footer-column footer-column--services">
          <h2>{t('nav.services')}</h2>
          {serviceLinks.map((service) => (
            <Link key={service.id} to={`/services/${service.slug}`}>
              {service.label}
            </Link>
          ))}
        </div>
        <div className="footer-column footer-column--contact">
          <h2>{t('footer.contact')}</h2>
          {company.phone ? (
            <ContactValue href={`tel:${company.phone}`} icon={Phone} value={company.phone} />
          ) : (
            <ContactValue icon={Phone} />
          )}
          {company.email ? (
            <ContactValue
              href={`mailto:${company.email}`}
              icon={MessageCircle}
              value={company.email}
            />
          ) : (
            <ContactValue icon={MessageCircle} />
          )}
          {company.businessHours ? (
            <ContactValue icon={Clock3} value={company.businessHours} />
          ) : (
            <ContactValue icon={Clock3} />
          )}
          {company.address ? (
            <p className="footer-contact__item">{company.address}</p>
          ) : (
            <p className="footer-contact__item">{t('contact.locationAvailable')}</p>
          )}
        </div>
      </div>
      <div className="container site-footer__bottom">
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
  const { t } = useTranslation();
  const message = encodeURIComponent(t('contact.whatsappMessage'));
  const href = company.whatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${message}`
    : '/contact#contact-details';
  return (
    <a
      aria-label={company.whatsapp ? t('contact.whatsapp') : t('contact.quickContact')}
      className="quick-contact"
      href={href}
      rel={company.whatsapp ? 'noreferrer' : undefined}
      target={company.whatsapp ? '_blank' : undefined}
    >
      <MessageCircle aria-hidden="true" size={21} />
      <span>{company.whatsapp ? t('contact.whatsapp') : t('contact.quickContact')}</span>
    </a>
  );
}

export function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <QuickContact />
    </>
  );
}
