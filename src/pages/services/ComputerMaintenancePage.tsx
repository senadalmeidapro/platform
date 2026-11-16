import { useState } from 'react';
import {
  ArrowRight,
  Bug,
  Check,
  Fan,
  Gauge,
  HardDrive,
  Power,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Wrench,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { PageMeta } from '../../components/PageMeta';
import './computer-maintenance.css';

type Symptom = {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  causes: string[];
  actions: string[];
  note: string;
};

const symptoms: Symptom[] = [
  {
    id: 'slow',
    label: 'Ordinateur lent',
    icon: Gauge,
    causes: [
      'Disque dur mécanique fatigué',
      'Mémoire vive insuffisante',
      'Trop de programmes au démarrage',
      'Système encombré ou non mis à jour',
    ],
    actions: [
      'Test du disque et de la mémoire',
      'Nettoyage et désactivation des programmes inutiles',
      'Passage à un SSD ou ajout de mémoire si c’est pertinent',
      'Mises à jour du système et des pilotes',
    ],
    note: 'Un SSD est souvent l’amélioration qui change le plus la vitesse ressentie sur un ordinateur ancien.',
  },
  {
    id: 'boot',
    label: 'Ne démarre plus',
    icon: Power,
    causes: [
      'Chargeur ou batterie défaillant',
      'Système endommagé',
      'Disque en panne',
      'Problème de carte mère ou de mémoire',
    ],
    actions: [
      'Vérification de l’alimentation',
      'Test de la mémoire et du disque',
      'Réparation ou réinstallation du système',
      'Devis si une pièce doit être remplacée',
    ],
    note: 'Évitez de rallumer l’appareil en boucle : cela peut aggraver certains défauts de disque.',
  },
  {
    id: 'virus',
    label: 'Virus et publicités',
    icon: Bug,
    causes: [
      'Logiciels téléchargés depuis des sources douteuses',
      'Extensions de navigateur indésirables',
      'Pièces jointes ou liens piégés',
      'Antivirus absent ou périmé',
    ],
    actions: [
      'Analyse et suppression des menaces',
      'Nettoyage du navigateur et des programmes installés',
      'Mises à jour de sécurité',
      'Mise en place d’un antivirus et conseils d’usage',
    ],
    note: 'Changez vos mots de passe importants depuis un autre appareil si vous soupçonnez un vol d’identifiants.',
  },
  {
    id: 'heat',
    label: 'Surchauffe et bruit',
    icon: Thermometer,
    causes: [
      'Poussière dans les ventilateurs',
      'Pâte thermique desséchée',
      'Ventilateur usé',
      'Aération insuffisante du poste',
    ],
    actions: [
      'Démontage et nettoyage interne',
      'Remplacement de la pâte thermique',
      'Changement du ventilateur si nécessaire',
      'Conseils d’installation et d’aération',
    ],
    note: 'Dans un environnement poussiéreux ou chaud, un nettoyage régulier évite beaucoup de pannes.',
  },
  {
    id: 'part',
    label: 'Pièce cassée ou usée',
    icon: Wrench,
    causes: [
      'Écran fissuré ou rayé',
      'Clavier ou touchpad défaillant',
      'Batterie qui ne tient plus',
      'Charnière, port USB ou prise de charge abîmés',
    ],
    actions: [
      'Identification de la pièce compatible',
      'Devis avant remplacement',
      'Remplacement et test complet',
      'Conseils pour limiter la récidive',
    ],
    note: 'Nous comparons toujours le coût de la pièce avec la valeur et l’âge de l’appareil.',
  },
  {
    id: 'data',
    label: 'Données en danger',
    icon: HardDrive,
    causes: [
      'Disque qui claque ou devient illisible',
      'Fichiers supprimés par erreur',
      'Système qui ne démarre plus',
      'Formatage accidentel',
    ],
    actions: [
      'Évaluation de l’état du disque',
      'Copie des données quand le disque reste lisible',
      'Récupération des fichiers lorsque c’est possible',
      'Mise en place d’une sauvegarde pour la suite',
    ],
    note: 'La récupération n’est jamais garantie. Plus on intervient tôt, plus les chances augmentent.',
  },
];

const decisions = [
  {
    title: 'Réparer',
    text: 'Quand la panne est ciblée et le coût raisonnable par rapport à la valeur de l’appareil.',
    items: [
      'Écran, batterie, clavier ou ventilateur à remplacer',
      'Système à réparer ou à réinstaller',
      'Appareil récent ou encore performant',
    ],
  },
  {
    title: 'Améliorer',
    text: 'Quand l’ordinateur fonctionne mais ne suit plus votre usage.',
    items: [
      'Passage d’un disque dur à un SSD',
      'Ajout de mémoire vive',
      'Nettoyage complet et système remis à neuf',
    ],
  },
  {
    title: 'Remplacer',
    text: 'Quand les réparations coûtent presque autant qu’un appareil adapté.',
    items: [
      'Carte mère défaillante sur un appareil ancien',
      'Composants trop anciens pour vos logiciels',
      'Pannes répétées et appareil devenu peu fiable',
    ],
  },
];

const interventions = [
  {
    icon: Gauge,
    title: 'Diagnostic',
    items: [
      'Test du disque et de la mémoire',
      'Analyse du démarrage et du système',
      'Contrôle de la température et de la ventilation',
      'Vérification du chargeur et de la batterie',
    ],
  },
  {
    icon: Wrench,
    title: 'Réparation',
    items: [
      'Remplacement d’écran, clavier, batterie, ventilateur',
      'Passage d’un disque dur à un SSD',
      'Réparation ou réinstallation du système',
      'Récupération de données lorsque c’est possible',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    items: [
      'Suppression des virus et logiciels indésirables',
      'Mises à jour du système et des pilotes',
      'Mise en place d’un antivirus',
      'Conseils pour éviter une nouvelle infection',
    ],
  },
];

const steps = [
  {
    title: 'Prise en charge',
    text: 'Vous décrivez les symptômes et l’historique. Nous notons l’appareil et ses accessoires.',
  },
  {
    title: 'Diagnostic',
    text: 'Tests matériels et logiciels pour trouver la cause réelle, pas seulement le symptôme.',
  },
  {
    title: 'Options et devis',
    text: 'Réparer, améliorer ou remplacer : chaque option est présentée avec son coût.',
  },
  {
    title: 'Intervention',
    text: 'Réparation, nettoyage ou réinstallation selon la solution que vous avez validée.',
  },
  {
    title: 'Tests et restitution',
    text: 'Contrôle complet, explications sur ce qui a été fait et conseils pratiques.',
  },
];

const faq = [
  {
    question: 'Combien de temps dure une réparation ?',
    answer:
      'Cela dépend de la panne et de la disponibilité des pièces. Nous donnons une estimation après le diagnostic, avant que vous ne validiez l’intervention.',
  },
  {
    question: 'Pouvez-vous récupérer mes données ?',
    answer:
      'Dans de nombreux cas oui, tant que le disque est encore lisible, mais ce n’est jamais garanti. Si vous entendez des claquements ou si l’ordinateur ne voit plus le disque, éteignez-le et évitez de le rallumer.',
  },
  {
    question: 'Vaut-il mieux réparer ou remplacer ?',
    answer:
      'Nous comparons le coût de la réparation, l’âge de l’appareil et vos besoins. Si le remplacement est plus raisonnable, nous vous le disons.',
  },
  {
    question: 'Faut-il apporter l’ordinateur ou intervenez-vous sur place ?',
    answer:
      'Précisez votre situation dans la demande : nous confirmons si l’intervention se fait sur place ou après prise en charge du matériel, selon la panne.',
  },
  {
    question: 'Le nettoyage interne est-il vraiment utile ?',
    answer:
      'Oui. La poussière accumulée et la pâte thermique usée font chauffer le processeur, ce qui ralentit l’ordinateur et peut l’éteindre brutalement.',
  },
];

const workshopSheet = [
  { label: 'Disque', value: 'Usé', level: 82, tone: 'bad' },
  { label: 'Mémoire', value: 'Correcte', level: 48, tone: 'ok' },
  { label: 'Ventilation', value: 'Encrassée', level: 70, tone: 'warn' },
  { label: 'Démarrage', value: 'Lent', level: 64, tone: 'warn' },
];

export function ComputerMaintenancePage() {
  const [active, setActive] = useState(symptoms[0]!.id);
  const symptom = symptoms.find((item) => item.id === active)!;
  const SymptomIcon = symptom.icon;

  return (
    <div className="svc svc--maintenance">
      <PageMeta
        description="Ordinateur lent, virus, panne matérielle ou écran cassé : diagnostic expliqué, réparation, nettoyage et entretien préventif des ordinateurs fixes et portables."
        literal
        title="Réparation et maintenance d’ordinateurs | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Dépannage et entretien
              </span>
              <h1>Maintenance et réparation informatique</h1>
              <p className="svc-tagline">Un ordinateur qui redevient rapide, fiable et sûr.</p>
              <p className="svc-lead">
                Lenteurs, pannes, virus, écran cassé ou disque défaillant : nous commençons par un
                diagnostic, nous vous expliquons la cause en termes simples, puis nous réparons ou
                nous vous conseillons la solution la plus raisonnable, y compris le remplacement
                quand il est plus judicieux.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Diagnostic expliqué avant réparation
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Précautions pour vos données
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Entretien préventif
                </li>
              </ul>
              <div className="svc-actions">
                <Link
                  className="btn btn--primary btn--lg"
                  to="/request-quote?service=computer-maintenance"
                >
                  Demander un devis <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#symptomes">
                  Identifier mon problème
                </a>
              </div>
            </div>

            <aside aria-label="Exemple de fiche d’atelier" className="mnt-sheet">
              <header className="mnt-sheet__head">
                <span>Fiche d’atelier</span>
                <em>Exemple</em>
              </header>
              <div className="mnt-sheet__device">
                <span className="icon-box">
                  <HardDrive aria-hidden="true" size={20} />
                </span>
                <div>
                  <strong>Ordinateur portable</strong>
                  <small>Lent au démarrage · plusieurs années d’usage</small>
                </div>
              </div>
              <ul className="mnt-gauges">
                {workshopSheet.map((row) => (
                  <li key={row.label}>
                    <div>
                      <span>{row.label}</span>
                      <b className={`mnt-tone mnt-tone--${row.tone}`}>{row.value}</b>
                    </div>
                    <i className="mnt-bar">
                      <i
                        className={`mnt-bar__fill mnt-tone--${row.tone}`}
                        style={{ width: `${row.level}%` }}
                      />
                    </i>
                  </li>
                ))}
              </ul>
              <div className="mnt-sheet__reco">
                <Sparkles aria-hidden="true" size={18} />
                <p>
                  <strong>Recommandation :</strong> SSD, nettoyage interne et mise à jour du
                  système.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" id="symptomes">
        <div className="container">
          <div className="block-head">
            <h2>Quel est votre symptôme ?</h2>
            <p>
              Choisissez ce que vous observez : voici les causes les plus fréquentes et ce que nous
              faisons concrètement.
            </p>
          </div>
          <div className="mnt-explorer">
            <div aria-label="Symptômes" className="mnt-tabs" role="tablist">
              {symptoms.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    aria-controls="mnt-panel"
                    aria-selected={active === item.id}
                    className="mnt-tab"
                    id={`mnt-tab-${item.id}`}
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    role="tab"
                    type="button"
                  >
                    <span className="icon-box">
                      <Icon size={18} />
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div
              aria-labelledby={`mnt-tab-${symptom.id}`}
              className="card mnt-panel"
              id="mnt-panel"
              role="tabpanel"
            >
              <h3>
                <SymptomIcon size={20} /> {symptom.label}
              </h3>
              <div className="mnt-panel__cols">
                <div>
                  <h4>Causes fréquentes</h4>
                  <ul className="mnt-list">
                    {symptom.causes.map((cause) => (
                      <li key={cause}>{cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Ce que nous faisons</h4>
                  <CheckList items={symptom.actions} literal />
                </div>
              </div>
              <p className="svc-callout">
                <RefreshCcw aria-hidden="true" size={18} />
                <span>{symptom.note}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="block-head">
            <h2>Réparer, améliorer ou remplacer ?</h2>
            <p>
              Notre objectif n’est pas de vendre une pièce de plus : c’est de vous orienter vers la
              décision la plus raisonnable.
            </p>
          </div>
          <div className="grid grid--3">
            {decisions.map((decision, index) => (
              <article className="card mnt-decision" key={decision.title}>
                <span className="mnt-decision__index">0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
                <ul className="mnt-list">
                  {decision.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="block-head">
            <h2>Ce que comprend une intervention</h2>
          </div>
          <div className="grid grid--3">
            {interventions.map(({ icon: Icon, title, items }) => (
              <article className="card group-card" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{title}</h3>
                <CheckList items={items} literal />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark">
        <div className="container">
          <div className="block-head">
            <h2>De la prise en charge à la restitution</h2>
            <p>
              Vous savez toujours où en est votre ordinateur et ce que coûte chaque option avant de
              décider.
            </p>
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

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <span className="badge">Pour les bureaux et les familles</span>
            <h2>L’entretien préventif évite la panne au pire moment</h2>
            <p>
              Poussière, chaleur, mises à jour oubliées : la plupart des pannes se préparent
              doucement. Une visite d’entretien régulière coûte moins cher qu’un poste à l’arrêt en
              pleine activité. La fréquence dépend de l’usage et de l’environnement ; un contrôle
              annuel ou semestriel est courant.
            </p>
            <Link className="link" to="/request-quote?service=computer-maintenance">
              Parler d’un entretien régulier <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <article className="card list-card">
            <h3>
              <Fan aria-hidden="true" size={20} /> Ce que contrôle une visite d’entretien
            </h3>
            <CheckList
              items={[
                'Nettoyage interne et ventilation',
                'État du disque et de la batterie',
                'Mises à jour du système et de la sécurité',
                'Antivirus actif et à jour',
                'Programmes inutiles au démarrage',
                'Sauvegarde des fichiers importants',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Avant de nous contacter</h3>
            <CheckList
              items={[
                'Notez les symptômes : message d’erreur, moment où le problème apparaît',
                'Prévoyez le chargeur et les accessoires concernés',
                'Indiquez les fichiers importants et où ils se trouvent',
                'Précisez les logiciels indispensables à votre activité',
                'Signalez tout choc, liquide renversé ou coupure électrique récente',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Un diagnostic expliqué en termes simples',
                'Un devis avant toute pièce ou intervention supplémentaire',
                'Un ordinateur testé avant restitution',
                'Des conseils concrets pour éviter la récidive',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur la réparation</h2>
            <p>
              Vous ne trouvez pas votre réponse ? Écrivez-nous, nous vous répondons avec des
              conseils adaptés.
            </p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Décrivez le problème : nous vous répondons avec la marche à suivre et ce qu’il faut prévoir."
        literal
        title="Votre ordinateur ne fonctionne pas comme il devrait ?"
      />
    </div>
  );
}
