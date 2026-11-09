import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { company } from '../config/company';
import { LeadForm } from '../components/LeadForm';
import { PageMeta } from '../components/PageMeta';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageMeta description="meta.contact.description" title="meta.contact.title" />
      <section className="page-masthead page-masthead--contact">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('contact.kicker')}</p>
            <h1>{t('contact.title')}</h1>
            <p>{t('contact.description')}</p>
          </div>
        </div>
      </section>
      <section className="section contact-section" id="contact-details">
        <div className="container contact-section__layout">
          <aside className="contact-aside">
            <p className="eyebrow">{t('contact.detailsKicker')}</p>
            <h2>{t('contact.detailsTitle')}</h2>
            <p>{t('contact.detailsDescription')}</p>
            <div className="contact-detail-list">
              <div className="contact-detail">
                <span>
                  <Phone size={19} />
                </span>
                <div>
                  <small>{t('contact.phoneLabel')}</small>
                  {company.phone ? (
                    <a href={`tel:${company.phone}`}>{company.phone}</a>
                  ) : (
                    <p>{t('contact.detailsAvailable')}</p>
                  )}
                </div>
              </div>
              <div className="contact-detail">
                <span>
                  <Mail size={19} />
                </span>
                <div>
                  <small>{t('contact.emailLabel')}</small>
                  {company.email ? (
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  ) : (
                    <p>{t('contact.detailsAvailable')}</p>
                  )}
                </div>
              </div>
              <div className="contact-detail">
                <span>
                  <MapPin size={19} />
                </span>
                <div>
                  <small>{t('contact.locationLabel')}</small>
                  <p>{company.address || t('contact.locationAvailable')}</p>
                </div>
              </div>
              <div className="contact-detail">
                <span>
                  <Clock3 size={19} />
                </span>
                <div>
                  <small>{t('contact.hoursLabel')}</small>
                  <p>{company.businessHours || t('contact.hoursAvailable')}</p>
                </div>
              </div>
            </div>
            {company.whatsapp && (
              <a
                className="button button--whatsapp"
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle size={18} />
                {t('contact.whatsapp')}
              </a>
            )}
            <div aria-label={t('contact.locationLabel')} className="location-panel" role="img">
              <div className="location-panel__grid" />
              <span className="location-panel__pin">
                <MapPin size={21} />
              </span>
              <p>{t('contact.locationMapNote')}</p>
            </div>
          </aside>
          <div className="contact-form-panel">
            <div className="contact-form-panel__heading">
              <h2>{t('contact.formTitle')}</h2>
              <p>{t('contact.formDescription')}</p>
            </div>
            <LeadForm mode="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
