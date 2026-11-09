import { Link } from 'react-router';
import { company } from '../config/company';
import { useTranslation } from 'react-i18next';

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const { t } = useTranslation();
  return (
    <Link aria-label={company.name} className={`brand ${inverse ? 'brand--inverse' : ''}`} to="/">
      <span aria-hidden="true" className="brand__mark">
        <svg fill="none" viewBox="0 0 38 38">
          <path
            d="M8 9.5h13.2c5.1 0 8.8 3.4 8.8 9.5s-3.7 9.5-8.8 9.5H8V9.5Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M8 19h13m-13 9.5h7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle cx="29.5" cy="9.5" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand__wordmark">
        <strong>{company.name}</strong>
        <span>{t('brand.tagline')}</span>
      </span>
    </Link>
  );
}
