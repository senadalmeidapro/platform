import type { ReactNode } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

type PageHeaderProps = {
  title: string;
  description?: string;
  trail: BreadcrumbItem[];
  children?: ReactNode;
};

/** En-tête commun des pages intérieures : fil d’Ariane, titre, introduction. */
export function PageHeader({ title, description, trail, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container page-header__inner">
        <Breadcrumbs items={trail} />
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
        {children}
      </div>
    </section>
  );
}
