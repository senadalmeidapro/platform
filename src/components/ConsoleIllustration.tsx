import { CheckCircle2, CircleDashed, LoaderCircle } from 'lucide-react';
import { t } from '../content';

/**
 * Illustration décorative : aperçu d’un suivi d’intervention (réseau, caméras,
 * tâches). Elle montre le type de travail réalisé, elle ne représente pas un logiciel.
 */
export function ConsoleIllustration() {
  const jobs = [
    { label: 'console.job.0', status: 'done', icon: CheckCircle2 },
    { label: 'console.job.1', status: 'progress', icon: LoaderCircle },
    { label: 'console.job.2', status: 'planned', icon: CircleDashed },
  ] as const;

  return (
    <div aria-hidden="true" className="console">
      <div className="console__bar">
        <span className="console__dots">
          <i />
          <i />
          <i />
        </span>
        {t('console.title')}
        <span className="console__tag">{t('console.illustration')}</span>
      </div>
      <div className="console__body">
        <div className="tile">
          <p className="tile__title">
            {t('console.network')} <span className="live" />
          </p>
          <svg className="topology" viewBox="0 0 240 170">
            <line x1="120" x2="62" y1="30" y2="82" />
            <line x1="120" x2="178" y1="30" y2="82" />
            <line x1="62" x2="30" y1="82" y2="136" />
            <line x1="62" x2="94" y1="82" y2="136" />
            <line x1="178" x2="146" y1="82" y2="136" />
            <line x1="178" x2="210" y1="82" y2="136" />
            <rect className="node" height="26" rx="7" width="52" x="94" y="17" />
            <rect className="node" height="24" rx="7" width="44" x="40" y="70" />
            <rect className="node" height="24" rx="7" width="44" x="156" y="70" />
            {[30, 94, 146, 210].map((x) => (
              <circle className="node node--dim" cx={x} cy="140" key={x} r="9" />
            ))}
            <text x="120" y="55">
              {t('console.router')}
            </text>
            <text x="62" y="109">
              {t('console.switch')}
            </text>
            <text x="178" y="109">
              {t('console.switch')}
            </text>
            <text x="30" y="163">
              {t('console.device')}
            </text>
            <text x="210" y="163">
              {t('console.device')}
            </text>
          </svg>
        </div>
        <div className="tile">
          <p className="tile__title">
            {t('console.cameras')} <span className="live" />
          </p>
          <div className="cams">
            {[0, 1, 2, 3].map((index) => (
              <div className="cam" key={index}>
                <span>
                  CAM 0{index + 1} · {t(`console.cam.${index}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="tile tile--wide">
          <p className="tile__title">{t('console.jobs')}</p>
          <ul className="jobs">
            {jobs.map(({ label, status, icon: Icon }) => (
              <li className="job" key={label}>
                <Icon size={16} />
                {t(label)}
                <span className={`pill pill--${status}`}>{t(`console.status.${status}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
