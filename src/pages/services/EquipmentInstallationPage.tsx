import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CircleDashed,
  FileDown,
  Headphones,
  Laptop,
  LoaderCircle,
  Monitor,
  MonitorSmartphone,
  Printer,
  ScanLine,
  Zap,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { PageMeta } from '../../components/PageMeta';
import './equipment-installation.css';

type Item = { id: string; label: string; icon: ComponentType<{ size?: number }>; steps: string[] };

const items: Item[] = [
  {
    id: 'desktop',
    label: 'Ordinateur de bureau',
    icon: Monitor,
    steps: [
      'Contrôle du matériel livré',
      'Installation du système et des mises à jour',
      'Pilotes, navigateur et logiciels de bureau',
      'Comptes et réglages utilisateur',
    ],
  },
  {
    id: 'laptop',
    label: 'Ordinateur portable',
    icon: Laptop,
    steps: [
      'Contrôle du matériel livré',
      'Installation du système et des mises à jour',
      'Réglage de l’alimentation et de la batterie',
      'Connexion au Wi‑Fi et aux comptes',
    ],
  },
  {
    id: 'printer',
    label: 'Imprimante ou multifonction',
    icon: Printer,
    steps: [
      'Branchement local ou en réseau',
      'Installation des pilotes sur chaque poste concerné',
      'Réglage du papier, de la qualité et de la numérisation',
      'Test d’impression depuis chaque poste',
    ],
  },
  {
    id: 'scanner',
    label: 'Scanner',
    icon: ScanLine,
    steps: [
      'Installation du pilote et du logiciel',
      'Choix du dossier de destination',
      'Test de numérisation',
    ],
  },
  {
    id: 'screen',
    label: 'Écran supplémentaire',
    icon: MonitorSmartphone,
    steps: [
      'Branchement et câbles adaptés',
      'Réglage de la résolution et de la disposition',
      'Test d’affichage étendu ou dupliqué',
    ],
  },
  {
    id: 'ups',
    label: 'Onduleur ou multiprise protégée',
    icon: Zap,
    steps: [
      'Choix de la puissance selon le matériel à protéger',
      'Branchement et test de l’alimentation',
      'Repérage des prises protégées',
    ],
  },
  {
    id: 'peripherals',
    label: 'Webcam, casque, périphériques',
    icon: Headphones,
    steps: [
      'Branchement et reconnaissance',
      'Réglage du son et de l’image',
      'Test dans votre logiciel de visioconférence',
    ],
  },
  {
    id: 'transfer',
    label: 'Transfert des anciens fichiers',
    icon: FileDown,
    steps: [
      'Inventaire des dossiers à transférer',
      'Copie et vérification des fichiers',
      'Transfert de la messagerie et des favoris',
      'Contrôle avec vous avant clôture',
    ],
  },
];

const phases = [
  {
    title: 'Avant',
    subtitle: 'On prépare',
    items: [
      'Liste du matériel et du nombre de postes',
      'Repérage des prises, de l’espace et de l’accès Internet',
      'Configuration préalable quand c’est possible',
      'Choix d’une date qui gêne le moins votre activité',
    ],
  },
  {
    title: 'Pendant',
    subtitle: 'On installe',
    items: [
      'Mise en place des postes et des périphériques',
      'Câbles rangés et repérés',
      'Réglages du système, des comptes et de la messagerie',
      'Tests : impression, réseau, messagerie, sauvegarde',
    ],
  },
  {
    title: 'Après',
    subtitle: 'On vous passe la main',
    items: [
      'Démonstration aux utilisateurs',
      'Fiche récapitulative des réglages',
      'Ancien matériel mis de côté proprement',
      'Un interlocuteur si une question se présente',
    ],
  },
];

const types = [
  {
    icon: Monitor,
    title: 'Poste individuel',
    text: 'Un ordinateur ou une imprimante : mise en service, configuration et transfert de vos données.',
  },
  {
    icon: Building2,
    title: 'Équipement d’un bureau',
    text: 'Préparation en série, configuration homogène et périphériques partagés pour toute une équipe.',
  },
  {
    icon: Printer,
    title: 'Imprimante partagée',
    text: 'Installation réseau, pilotes sur chaque poste et test d’impression depuis chacun.',
  },
  {
    icon: Zap,
    title: 'Protection électrique',
    text: 'Choix et branchement d’onduleurs et de multiprises protégées pour le matériel sensible.',
  },
];

const faq = [
  {
    question: 'Fournissez-vous aussi le matériel ?',
    answer:
      'Oui, si vous le souhaitez : nous vous conseillons et vous fournissons le matériel. Vous pouvez aussi nous confier du matériel que vous avez déjà acheté.',
  },
  {
    question: 'Installez-vous les logiciels sous licence ?',
    answer:
      'Nous installons les logiciels dont vous détenez la licence et nous vous aidons à choisir des alternatives adaptées à votre budget si nécessaire.',
  },
  {
    question: 'Pouvez-vous transférer mes anciens fichiers ?',
    answer:
      'Oui. Nous transférons documents, favoris et messagerie, puis nous vérifions avec vous que tout est bien retrouvé avant de clôturer.',
  },
  {
    question: 'Intervenez-vous pour un seul ordinateur ?',
    answer: 'Oui. Nous installons aussi bien un poste isolé que l’équipement complet d’un bureau.',
  },
  {
    question: 'L’imprimante doit fonctionner depuis plusieurs postes, est-ce possible ?',
    answer:
      'Oui, soit en réseau, soit via un poste partagé. Nous choisissons la solution la plus fiable selon l’imprimante et vos locaux.',
  },
];

const voucher = [
  { label: 'Contrôle du matériel livré', tone: 'done' },
  { label: 'Système, pilotes et mises à jour', tone: 'done' },
  { label: 'Imprimante en réseau', tone: 'progress' },
  { label: 'Transfert des fichiers', tone: 'planned' },
  { label: 'Prise en main utilisateur', tone: 'planned' },
] as const;
const voucherIcon = { done: CheckCircle2, progress: LoaderCircle, planned: CircleDashed } as const;

export function EquipmentInstallationPage() {
  const [selected, setSelected] = useState<string[]>(['desktop', 'printer', 'transfer']);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  const plan = items.filter((item) => selected.includes(item.id));

  return (
    <div className="svc svc--installation">
      <PageMeta
        description="Mise en service d’ordinateurs, imprimantes, scanners, onduleurs et périphériques : installation, configuration, transfert de données et prise en main."
        literal
        title="Installation de matériel informatique | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Mise en service
              </span>
              <h1>Installation de matériel informatique</h1>
              <p className="svc-tagline">Du matériel livré à un poste prêt à travailler.</p>
              <p className="svc-lead">
                Ordinateurs, imprimantes, scanners, onduleurs et périphériques : nous les
                installons, les configurons et les testons chez vous ou dans vos locaux, pour que
                vos équipes puissent travailler dès le premier jour, sans mauvaise surprise.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Installation et configuration complètes
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Tests avant remise en service
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Prise en main des utilisateurs
                </li>
              </ul>
              <div className="svc-actions">
                <Link
                  className="btn btn--primary btn--lg"
                  to="/request-quote?service=equipment-installation"
                >
                  Demander un devis <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#composer">
                  Composer mon installation
                </a>
              </div>
            </div>

            <aside aria-label="Exemple de bon de mise en service" className="ins-voucher">
              <header>
                <strong>Bon de mise en service</strong>
                <em>Exemple</em>
              </header>
              <div aria-hidden="true" className="ins-progress">
                <i style={{ width: '45%' }} />
              </div>
              <p className="ins-voucher__count">2 étapes terminées sur 5</p>
              <ul>
                {voucher.map((row) => {
                  const Icon = voucherIcon[row.tone];
                  return (
                    <li
                      className={`ins-voucher__row ins-voucher__row--${row.tone}`}
                      key={row.label}
                    >
                      <Icon size={18} />
                      {row.label}
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" id="composer">
        <div className="container">
          <div className="block-head">
            <h2>Composez votre installation</h2>
            <p>
              Sélectionnez ce que vous devez équiper : le plan d’installation se construit sous vos
              yeux.
            </p>
          </div>
          <div className="ins-builder">
            <div className="ins-picker">
              {items.map((item) => {
                const Icon = item.icon;
                const on = selected.includes(item.id);
                return (
                  <button
                    aria-pressed={on}
                    className="ins-chip"
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    type="button"
                  >
                    <span className="icon-box">
                      <Icon size={18} />
                    </span>
                    {item.label}
                    <span aria-hidden="true" className="ins-chip__tick">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  </button>
                );
              })}
            </div>
            <div aria-live="polite" className="card ins-plan">
              <header>
                <h3>Votre plan d’installation</h3>
                <span className="ins-plan__count">
                  {plan.length} élément{plan.length > 1 ? 's' : ''}
                </span>
              </header>
              {plan.length === 0 ? (
                <p className="ins-plan__empty">
                  Sélectionnez au moins un équipement pour voir ce que nous faisons.
                </p>
              ) : (
                <ol className="ins-plan__list">
                  {plan.map((item) => (
                    <li key={item.id}>
                      <strong>{item.label}</strong>
                      <ul>
                        {item.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}
              <Link
                className="btn btn--primary btn--block"
                to="/request-quote?service=equipment-installation"
              >
                Demander un devis pour cette installation{' '}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="block-head">
            <h2>Le jour de l’installation, étape par étape</h2>
            <p>Nous préparons ce qui peut l’être en amont pour limiter le temps passé chez vous.</p>
          </div>
          <div className="ins-phases">
            {phases.map((phase, index) => (
              <article className="card ins-phase" key={phase.title}>
                <span className="ins-phase__num">{index + 1}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p className="ins-phase__sub">{phase.subtitle}</p>
                </div>
                <CheckList items={phase.items} literal />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="block-head">
            <h2>Quel type d’installation vous faut-il ?</h2>
          </div>
          <div className="grid grid--4">
            {types.map(({ icon: Icon, title, text }) => (
              <article className="card capability" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark">
        <div className="container split">
          <div className="split__copy">
            <span className="badge">Protéger votre matériel</span>
            <h2>Pourquoi une protection électrique compte</h2>
            <p>
              Les coupures brutales et les variations de tension peuvent corrompre des fichiers ou
              abîmer l’alimentation d’un ordinateur. Un onduleur laisse quelques minutes pour
              enregistrer et éteindre proprement ; une multiprise protégée limite les surtensions.
            </p>
            <Link className="link" to="/request-quote?service=equipment-installation">
              Ajouter une protection à mon installation <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="ins-power">
            <li>
              <Zap aria-hidden="true" size={20} />
              <div>
                <strong>Onduleur</strong>
                <span>
                  Alimente le poste quelques minutes lors d’une coupure pour fermer proprement.
                </span>
              </div>
            </li>
            <li>
              <Zap aria-hidden="true" size={20} />
              <div>
                <strong>Multiprise protégée</strong>
                <span>
                  Absorbe une partie des surtensions avant qu’elles n’atteignent le matériel.
                </span>
              </div>
            </li>
            <li>
              <Zap aria-hidden="true" size={20} />
              <div>
                <strong>Bon dimensionnement</strong>
                <span>La puissance se choisit selon le matériel branché, pas au hasard.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Ce qu’il nous faut</h3>
            <CheckList
              items={[
                'La liste et les modèles du matériel à installer',
                'L’emplacement prévu : prises électriques et accès à Internet',
                'Les comptes et licences à utiliser (messagerie, logiciels)',
                'La liste des fichiers à transférer depuis les anciens postes',
                'Une personne présente pour valider la mise en service',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Des postes et périphériques fonctionnels et testés',
                'Une fiche récapitulative des réglages (noms, comptes, appareils)',
                'Des utilisateurs à l’aise avec l’essentiel',
                'Un espace de travail rangé, câbles repérés',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur l’installation</h2>
            <p>
              Une question sur votre situation ? Décrivez-la dans votre demande, nous répondons.
            </p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Indiquez ce que vous devez équiper et pour quand : nous préparons une proposition d’installation."
        literal
        title="Du matériel à installer ?"
      />
    </div>
  );
}
