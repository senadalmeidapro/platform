import { useTranslation } from 'react-i18next';

type SectionHeadingProps = {
  title: string;
  description?: string;
  kicker?: string;
  light?: boolean;
  align?: 'left' | 'center';
};

export function SectionHeading({
  title,
  description,
  kicker,
  light = false,
  align = 'left',
}: SectionHeadingProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}
    >
      {kicker && <p className="section-heading__kicker">{t(kicker)}</p>}
      <h2>{t(title)}</h2>
      {description && <p className="section-heading__description">{t(description)}</p>}
    </div>
  );
}
