import { t } from '../content';

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-head__copy ${align === 'center' ? 'section-head__copy--center' : ''}`}>
      <h2>{t(title)}</h2>
      {description && <p>{t(description)}</p>}
    </div>
  );
}
