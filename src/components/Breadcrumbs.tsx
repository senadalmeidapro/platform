import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export type BreadcrumbItem = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useTranslation();
  return (
    <nav aria-label={t('common.breadcrumbs')} className="breadcrumbs">
      <Link to="/">{t('nav.home')}</Link>
      {items.map((item, index) => (
        <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
          <ChevronRight aria-hidden="true" size={14} />
          {item.to ? (
            <Link to={item.to}>{t(item.label)}</Link>
          ) : (
            <span aria-current="page">{t(item.label)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
