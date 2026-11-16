import { useMemo, useState } from 'react';
import { ArrowRight, Check, ClipboardCheck, Compass, FileText, Wrench } from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { ImageFrame } from '../../components/ImageFrame';
import { PageMeta } from '../../components/PageMeta';
import { t } from '../../content';
import { products } from '../../data/catalog';
import './equipment-sales.css';

const usages = [
  { id: 'office', label: 'Bureautique et Internet' },
  { id: 'management', label: 'Gestion et comptabilité' },
  { id: 'creative', label: 'Création graphique ou vidéo' },
  { id: 'study', label: 'Études et télétravail' },
] as const;
const forms = [
  { id: 'laptop', label: 'Portable' },
  { id: 'desktop', label: 'Ordinateur fixe' },
] as const;
const budgets = [
  { id: 'saver', label: 'Économique' },
  { id: 'balanced', label: 'Équilibré' },
  { id: 'performance', label: 'Performant' },
] as const;

type UsageId = (typeof usages)[number]['id'];
type FormId = (typeof forms)[number]['id'];
type BudgetId = (typeof budgets)[number]['id'];

const profiles: Record<
  UsageId,
  { cpu: string[]; ram: string[]; storage: string[]; extras: string[] }
> = {
  office: {
    cpu: ['Entrée de gamme récent', 'Milieu de gamme', 'Milieu de gamme'],
    ram: ['8 Go', '8 Go', '16 Go'],
    storage: ['SSD 256 Go', 'SSD 512 Go', 'SSD 512 Go'],
    extras: [
      'Un SSD est indispensable pour une machine réactive',
      'Vérifiez les conditions de garantie et le service après-vente',
    ],
  },
  management: {
    cpu: ['Milieu de gamme', 'Milieu de gamme', 'Haut de gamme'],
    ram: ['8 Go', '16 Go', '16 Go'],
    storage: ['SSD 256 Go', 'SSD 512 Go', 'SSD 1 To'],
    extras: [
      'Un second écran facilite la saisie et la consultation',
      'Prévoyez une sauvegarde régulière des données de gestion',
      'Un onduleur est conseillé si les coupures sont fréquentes',
    ],
  },
  creative: {
    cpu: ['Milieu à haut de gamme', 'Haut de gamme', 'Haut de gamme'],
    ram: ['16 Go', '32 Go', '32 Go ou plus'],
    storage: ['SSD 512 Go', 'SSD 1 To', 'SSD 1 To ou plus'],
    extras: [
      'Un écran de bonne qualité, idéalement calibrable',
      'Une carte graphique dédiée selon les logiciels utilisés',
      'Du stockage supplémentaire pour les projets et les archives',
    ],
  },
  study: {
    cpu: ['Entrée de gamme récent', 'Milieu de gamme', 'Milieu de gamme'],
    ram: ['8 Go', '16 Go', '16 Go'],
    storage: ['SSD 256 Go', 'SSD 512 Go', 'SSD 512 Go'],
    extras: [
      'Autonomie et poids comptent pour un portable que l’on transporte',
      'Une webcam et un micro corrects pour les visioconférences',
      'Une protection contre les chocs et un chargeur de rechange',
    ],
  },
};

const screens: Record<FormId, string[]> = {
  laptop: [
    'Écran 14 à 15,6 pouces',
    'Écran 15,6 pouces',
    'Écran 15,6 à 16 pouces, dalle de bonne qualité',
  ],
  desktop: ['Écran 22 à 24 pouces', 'Écran 24 pouces', 'Écran 27 pouces ou double écran'],
};
const formNote: Record<FormId, string> = {
  laptop: 'Prévoyez le chargeur d’origine et une sacoche de protection.',
  desktop: 'Clavier, souris et écran sont à prévoir avec l’unité centrale.',
};

const mainCategories = [
  'computers',
  'displays',
  'printing',
  'networking',
  'security',
  'officeEquipment',
] as const;

const included = [
  {
    icon: Compass,
    title: 'Un conseil sur mesure',
    text: 'Votre usage, votre budget et votre matériel existant guident le choix, pas la fiche de promotion du moment.',
  },
  {
    icon: ClipboardCheck,
    title: 'Un matériel vérifié',
    text: 'Nous contrôlons le matériel avant de vous le remettre.',
  },
  {
    icon: Wrench,
    title: 'Une installation en option',
    text: 'Mise en service, configuration et transfert de données si vous voulez un matériel prêt à l’emploi.',
  },
  {
    icon: FileText,
    title: 'Des documents clairs',
    text: 'Devis, documents d’achat et conditions de garantie du fabricant ou du vendeur, le cas échéant.',
  },
];

const steps = [
  {
    title: 'Expression du besoin',
    text: 'Usage, budget, nombre d’appareils, matériel existant et délai souhaité.',
  },
  {
    title: 'Sélection',
    text: 'Nous comparons quelques options pertinentes et vous expliquons leurs différences.',
  },
  { title: 'Devis', text: 'Un devis clair par option, pour décider en connaissance de cause.' },
  {
    title: 'Livraison ou retrait',
    text: 'Matériel vérifié avant remise, avec les documents d’achat.',
  },
  {
    title: 'Installation (en option)',
    text: 'Mise en service et configuration si vous souhaitez un matériel prêt à l’emploi.',
  },
];

const faq = [
  {
    question: 'Pouvez-vous me conseiller sans m’obliger à acheter ?',
    answer: 'Oui. Nous vous aidons à définir votre besoin et vous restez libre de la suite.',
  },
  {
    question: 'Pouvez-vous commander une référence précise ?',
    answer:
      'Dans la mesure du possible, oui. Indiquez le modèle recherché dans votre demande et nous vérifions la disponibilité et le délai.',
  },
  {
    question: 'Le matériel est-il garanti ?',
    answer:
      'Les conditions de garantie dépendent du produit et de son fabricant. Elles sont précisées sur le devis et les documents d’achat.',
  },
  {
    question: 'Puis-je acheter et me faire installer le matériel ?',
    answer:
      'Oui. Nous pouvons livrer, installer, configurer et tester, pour que le matériel soit prêt à l’emploi.',
  },
  {
    question: 'Comment sont fixés les prix ?',
    answer:
      'Ils dépendent du modèle, de la disponibilité et des quantités. Nous établissons un devis pour chaque demande.',
  },
];

const heroProfiles = [
  { label: 'Bureautique', specs: ['8 Go', 'SSD'] },
  { label: 'Gestion', specs: ['16 Go', 'SSD'] },
  { label: 'Création', specs: ['32 Go', 'SSD + disque'] },
];

export function EquipmentSalesPage() {
  const [usage, setUsage] = useState<UsageId>('office');
  const [form, setForm] = useState<FormId>('laptop');
  const [budget, setBudget] = useState<BudgetId>('balanced');
  const i = budgets.findIndex((item) => item.id === budget);

  const recommendation = useMemo(() => {
    const profile = profiles[usage];
    return {
      rows: [
        ['Processeur', profile.cpu[i]!],
        ['Mémoire vive', profile.ram[i]!],
        ['Stockage', profile.storage[i]!],
        ['Affichage', screens[form][i]!],
      ] as Array<[string, string]>,
      extras: [...profile.extras, formNote[form]],
    };
  }, [form, i, usage]);

  return (
    <div className="svc svc--sales">
      <PageMeta
        description="Ordinateurs, écrans, imprimantes, réseau, caméras et fournitures de bureau : conseil selon l’usage et le budget, avec installation possible."
        literal
        title="Vente de matériel informatique et de bureau | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Conseil et fourniture
              </span>
              <h1>Vente de matériel informatique et de bureau</h1>
              <p className="svc-tagline">
                Le bon matériel pour votre usage, sans surpayer ni compliquer.
              </p>
              <p className="svc-lead">
                Ordinateurs, écrans, imprimantes, équipements réseau, caméras et fournitures de
                bureau : nous vous conseillons selon votre usage, votre budget et ce que vous
                possédez déjà, puis nous pouvons assurer l’installation pour que tout fonctionne
                ensemble.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Conseil selon l’usage et le budget
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Compatible avec votre existant
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Installation possible
                </li>
              </ul>
              <div className="svc-actions">
                <Link
                  className="btn btn--primary btn--lg"
                  to="/request-quote?service=it-equipment-sales"
                >
                  Demander un devis <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#guide">
                  Trouver ma configuration
                </a>
              </div>
            </div>

            <div aria-hidden="true" className="sal-fan">
              {heroProfiles.map((profile, index) => (
                <div className={`sal-fan__card sal-fan__card--${index + 1}`} key={profile.label}>
                  <span className="sal-fan__label">{profile.label}</span>
                  <div className="sal-fan__specs">
                    {profile.specs.map((spec) => (
                      <b key={spec}>{spec}</b>
                    ))}
                  </div>
                  <i className="sal-fan__bar">
                    <i style={{ width: `${40 + index * 28}%` }} />
                  </i>
                </div>
              ))}
              <span className="sal-fan__tag">Exemple de comparatif</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="guide">
        <div className="container">
          <div className="block-head">
            <h2>Trouvez votre configuration</h2>
            <p>
              Trois choix, un profil conseillé. C’est un point de départ : nous l’affinons avec vos
              logiciels et votre budget réel.
            </p>
          </div>
          <div className="sal-guide">
            <div className="sal-controls">
              <fieldset>
                <legend>Votre usage</legend>
                <div className="sal-options">
                  {usages.map((item) => (
                    <button
                      aria-pressed={usage === item.id}
                      key={item.id}
                      onClick={() => setUsage(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Format</legend>
                <div className="svc-segmented" role="group">
                  {forms.map((item) => (
                    <button
                      aria-pressed={form === item.id}
                      key={item.id}
                      onClick={() => setForm(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Priorité budget</legend>
                <div className="svc-segmented" role="group">
                  {budgets.map((item) => (
                    <button
                      aria-pressed={budget === item.id}
                      key={item.id}
                      onClick={() => setBudget(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <article aria-live="polite" className="sal-sheet">
              <header>
                <p>Profil conseillé</p>
                <h3>{usages.find((item) => item.id === usage)!.label}</h3>
                <span>
                  {forms.find((item) => item.id === form)!.label} · {budgets[i]!.label}
                </span>
              </header>
              <dl>
                {recommendation.rows.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="sal-sheet__extras">
                <h4>À prévoir aussi</h4>
                <CheckList items={recommendation.extras} literal />
              </div>
              <Link
                className="btn btn--primary btn--block"
                to="/request-quote?service=it-equipment-sales"
              >
                Demander un devis pour ce profil <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="block-head" style={{ marginBottom: 0 }}>
              <h2>Ce que nous pouvons vous fournir</h2>
              <p>Un seul interlocuteur pour l’informatique, le réseau, la sécurité et le bureau.</p>
            </div>
            <Link className="link" to="/products">
              Voir le catalogue <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="grid grid--3">
            {mainCategories.map((category) => {
              const product = products.find((item) => item.category === category);
              return (
                <Link className="card sal-cat" key={category} to={`/products?category=${category}`}>
                  <ImageFrame alt="" className="sal-cat__img" src={product?.image ?? ''} />
                  <div>
                    <h3>{t(`products.categories.${category}`)}</h3>
                    <span className="link">
                      Voir les produits <ArrowRight aria-hidden="true" size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="note">{t('products.demoNote')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="block-head">
            <h2>Ce qui est inclus avec votre achat</h2>
          </div>
          <div className="grid grid--4">
            {included.map(({ icon: Icon, title, text }) => (
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
        <div className="container">
          <div className="block-head">
            <h2>De votre besoin à la livraison</h2>
          </div>
          <ol className="timeline">
            {steps.map((step, index) => (
              <li className="t-step" key={step.title}>
                <span className="t-step__num">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Ce qui nous aide à bien conseiller</h3>
            <CheckList
              items={[
                'Votre usage principal et les logiciels utilisés',
                'Un budget indicatif',
                'Le nombre d’appareils et le lieu d’installation',
                'Le matériel existant à conserver ou à remplacer',
                'Le délai souhaité',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Une recommandation argumentée',
                'Un devis clair pour chaque option',
                'Un matériel vérifié avant remise',
                'Les documents d’achat et, le cas échéant, les conditions de garantie',
                'Une installation sur demande',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur l’achat</h2>
            <p>Une référence précise en tête ? Indiquez-la dans votre demande.</p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Indiquez votre usage et votre budget : nous vous proposons des options comparées."
        literal
        title="Un équipement à choisir ?"
      />
    </div>
  );
}
