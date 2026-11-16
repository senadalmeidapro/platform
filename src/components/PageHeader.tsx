import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { t } from '../content';

type BreadcrumbItem = { label: string; to?: string };

type PageHeaderProps = {
  title: string;
  description?: string;
  trail: BreadcrumbItem[];
  children?: ReactNode;
};

/** En-tête commun des pages intérieures : fil d’Ariane, titre, introduction. */
export function PageHeader({ title, description, trail, children }: PageHeaderProps) {
  return (
    <section className="page-header on-dark">
      <div className="container page-header__inner">
        <nav aria-label={t('common.breadcrumbs')} className="breadcrumbs">
          <Link to="/">{t('nav.home')}</Link>
          {trail.map((item, index) => {
            const current = index === trail.length - 1;
            return item.to && !current ? (
              <Link key={`${item.label}-${index}`} to={item.to}>
                {t(item.label)}
              </Link>
            ) : (
              <span aria-current={current ? 'page' : undefined} key={`${item.label}-${index}`}>
                {t(item.label)}
              </span>
            );
          })}
        </nav>
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
        {children}
      </div>
    </section>
  );
}
