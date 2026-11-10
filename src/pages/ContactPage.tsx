import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { company } from '../config/company';
import { t } from '../content';

function Detail({
  icon: Icon,
  label,
  value,
  href,
  fallback,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  fallback: string;
}) {
  return (
    <div className="info">
      <span className="icon-box">
        <Icon aria-hidden="true" size={20} />
      </span>
      <div>
        <small>{label}</small>
        {value ? href ? <a href={href}>{value}</a> : <p>{value}</p> : <p>{fallback}</p>}
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <>
      <PageMeta description="meta.contact.description" title="meta.contact.title" />
      <PageHeader
        description={t('contact.description')}
        title={t('contact.title')}
        trail={[{ label: 'nav.contact' }]}
      />

      <section className="section" id="contact-details">
        <div className="container form-layout">
          <aside className="aside">
            <h2>{t('contact.detailsTitle')}</h2>
            <p>{t('contact.detailsDescription')}</p>
            <div className="info-list">
              <Detail
                fallback={t('contact.detailsAvailable')}
                href={`tel:${company.phone}`}
                icon={Phone}
                label={t('contact.phoneLabel')}
                value={company.phone}
              />
              <Detail
                fallback={t('contact.detailsAvailable')}
                href={`mailto:${company.email}`}
                icon={Mail}
                label={t('contact.emailLabel')}
                value={company.email}
              />
              <Detail
                fallback={t('contact.locationAvailable')}
                icon={MapPin}
                label={t('contact.locationLabel')}
                value={company.address}
              />
              <Detail
                fallback={t('contact.hoursAvailable')}
                icon={Clock3}
                label={t('contact.hoursLabel')}
                value={company.businessHours}
              />
            </div>
            {company.whatsapp && (
              <a
                className="btn btn--secondary"
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={18} />
                {t('contact.whatsapp')}
              </a>
            )}
          </aside>

          <div className="panel">
            <div className="panel__head">
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
