import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { t } from '../content';

export type BreadcrumbItem = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label={t('common.breadcrumbs')} className="breadcrumbs">
      <Link to="/">{t('nav.home')}</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
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
