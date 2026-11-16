import { Link } from 'react-router';
import { company } from '../config/company';
import { t } from '../content';

export function Brand({
  inverse = false,
  onNavigate,
}: {
  inverse?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      aria-label={`${company.name} – ${t('nav.home')}`}
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      onClick={onNavigate}
      to="/"
    >
      <span aria-hidden="true" className="brand__mark">
        <svg fill="none" viewBox="0 0 38 38">
          <path
            d="M8 9.5h13.2c5.1 0 8.8 3.4 8.8 9.5s-3.7 9.5-8.8 9.5H8V9.5Z"
            stroke="currentColor"
            strokeWidth="3.4"
          />
          <path d="M8 19h13" stroke="currentColor" strokeLinecap="round" strokeWidth="3.4" />
        </svg>
      </span>
      <span className="brand__text">
        <strong>{company.name}</strong>
        <span>{t('brand.tagline')}</span>
      </span>
    </Link>
  );
}
