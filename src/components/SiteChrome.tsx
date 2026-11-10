import { useEffect, useRef, useState } from 'react';
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
import { services } from '../data/catalog';
import { Brand } from './Brand';
import { ServiceIcon } from './ServiceIcon';

const navigation = [
  { label: 'nav.products', to: '/products' },
  { label: 'nav.about', to: '/about' },
  { label: 'nav.faq', to: '/faq' },
  { label: 'nav.contact', to: '/contact' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `nav__link ${isActive ? 'is-active' : ''}`;
const mobileClass = ({ isActive }: { isActive: boolean }) =>
  `mobile-nav__link ${isActive ? 'active' : ''}`;

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="menu" ref={ref}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        className={`nav__link ${pathname.startsWith('/services') ? 'is-active' : ''}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {t('nav.services')} <ChevronDown aria-hidden="true" size={15} />
      </button>
      {open && (
        <div className="menu__panel">
          {services.map((service) => (
            <Link className="menu__item" key={service.id} to={`/services/${service.slug}`}>
              <span className="icon-box">
                <ServiceIcon name={service.icon} />
              </span>
              <span>
                <strong>{t(`services.items.${service.id}.title`)}</strong>
                <small>{t(`services.items.${service.id}.short`)}</small>
              </span>
            </Link>
          ))}
          <Link className="menu__all" to="/services">
            {t('common.allServices')} <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMobileOpen(false), [pathname]);
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
    <header className={`header ${scrolled || mobileOpen ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Brand />
        <nav aria-label={t('nav.primary')} className="nav">
          <ServicesMenu />
          {navigation.map((item) => (
            <NavLink className={navClass} key={item.to} to={item.to}>
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Link className="btn btn--primary" to="/request-quote">
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
          <NavLink className={mobileClass} end to="/">
            {t('nav.home')}
          </NavLink>
          <button
            aria-expanded={mobileServicesOpen}
            className="mobile-nav__link"
            onClick={() => setMobileServicesOpen((value) => !value)}
            type="button"
          >
            {t('nav.services')}
            <ChevronDown
              aria-hidden="true"
              size={18}
              style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : undefined }}
            />
          </button>
          {mobileServicesOpen && (
            <div className="mobile-nav__sub">
              <Link to="/services">{t('common.allServices')}</Link>
              {services.map((service) => (
                <Link key={service.id} to={`/services/${service.slug}`}>
                  {t(`services.items.${service.id}.title`)}
                </Link>
              ))}
            </div>
          )}
          {navigation.map((item) => (
            <NavLink className={mobileClass} key={item.to} to={item.to}>
              {t(item.label)}
            </NavLink>
          ))}
          <Link className="btn btn--primary btn--lg btn--block" to="/request-quote">
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
    <footer className="footer">
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
