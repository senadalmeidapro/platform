import { useState } from 'react';
import {
  ArrowRight,
  Check,
  DatabaseBackup,
  Mail,
  Monitor,
  Network,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { PageMeta } from '../../components/PageMeta';
import './it-support.css';

const questions = [
  {
    id: 'backup',
    text: 'Vos fichiers importants sont-ils sauvegardés ailleurs que sur l’ordinateur ?',
    fix: 'Mettre en place une sauvegarde automatique et vérifier qu’elle se restaure.',
  },
  {
    id: 'antivirus',
    text: 'Vos ordinateurs ont-ils un antivirus actif et à jour ?',
    fix: 'Installer une protection et la tenir à jour sur tous les postes.',
  },
  {
    id: 'accounts',
    text: 'Chaque utilisateur a-t-il son propre compte et son propre mot de passe ?',
    fix: 'Organiser les comptes et les accès, un par personne.',
  },
  {
    id: 'updates',
    text: 'Les mises à jour du système sont-elles faites régulièrement ?',
    fix: 'Planifier les mises à jour du système et de la sécurité.',
  },
  {
    id: 'inventory',
    text: 'Savez-vous précisément quels équipements et logiciels vous possédez ?',
    fix: 'Dresser un inventaire du matériel, des logiciels et des licences.',
  },
  {
    id: 'contact',
    text: 'Avez-vous une personne à appeler quand une panne survient ?',
    fix: 'Définir un point de contact technique identifié.',
  },
];

const formulas = [
  {
    title: 'Intervention à la demande',
    for: 'Besoins occasionnels',
    items: [
      'Vous nous contactez quand c’est nécessaire',
      'Nous intervenons à distance ou sur place',
      'L’intervention est facturée selon le travail réalisé',
    ],
  },
  {
    title: 'Suivi régulier',
    for: 'Petite structure sans informaticien',
    items: [
      'Contrôles planifiés et entretien préventif',
      'Assistance selon l’accord convenu',
      'Revue périodique de l’état du parc',
    ],
  },
  {
    title: 'Audit et plan d’amélioration',
    for: 'Avant un renouvellement ou une croissance',
    items: [
      'État des lieux du matériel, du réseau et des sauvegardes',
      'Risques identifiés et classés',
      'Recommandations chiffrées et priorisées',
    ],
  },
  {
    title: 'Projet d’infrastructure',
    for: 'Nouveau site, migration, restructuration',
    items: [
      'Pilotage de l’ensemble du projet',
      'Postes, réseau, sauvegarde, comptes et accès',
      'Mise en service et prise en main',
    ],
  },
];

const areas = [
  {
    icon: Monitor,
    title: 'Postes de travail',
    text: 'Installation, mises à jour, dépannage et renouvellement planifié.',
  },
  {
    icon: Mail,
    title: 'Messagerie et logiciels',
    text: 'Comptes professionnels, configuration sur postes et téléphones, aide à l’usage.',
  },
  {
    icon: DatabaseBackup,
    title: 'Sauvegardes',
    text: 'Sauvegarde des données essentielles et test de restauration.',
  },
  {
    icon: Users,
    title: 'Comptes et accès',
    text: 'Un compte par personne, droits adaptés, mots de passe gérés proprement.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    text: 'Antivirus, mises à jour de sécurité, bonnes pratiques expliquées à vos équipes.',
  },
  {
    icon: Network,
    title: 'Réseau et imprimantes',
    text: 'Wi‑Fi, partage de fichiers, imprimantes et accès à Internet qui fonctionnent.',
  },
];

const steps = [
  {
    title: 'Audit initial',
    text: 'Inventaire des postes, des logiciels, du réseau et des sauvegardes existantes.',
  },
  {
    title: 'Plan d’actions',
    text: 'Liste priorisée des corrections et des améliorations, avec leur coût.',
  },
  { title: 'Mise à niveau', text: 'Sauvegardes, comptes, mises à jour et sécurité remis à plat.' },
  { title: 'Support au quotidien', text: 'Vos demandes sont traitées, suivies et documentées.' },
  {
    title: 'Revue périodique',
    text: 'Point régulier sur l’état du parc et les évolutions à prévoir.',
  },
];

const audiences = [
  {
    title: 'Une petite entreprise',
    text: 'Postes, messagerie, imprimante et sauvegarde pris en charge, sans embaucher un informaticien.',
  },
  {
    title: 'Un cabinet ou une profession libérale',
    text: 'Données sensibles protégées, sauvegardées et accessibles uniquement aux bonnes personnes.',
  },
  {
    title: 'Une association ou une organisation',
    text: 'Parc hétérogène remis en ordre, avec un budget de renouvellement planifié.',
  },
];

const faq = [
  {
    question: 'Pouvez-vous intervenir à distance ?',
    answer:
      'Oui, pour tout ce qui ne demande pas d’être sur place : logiciels, comptes, messagerie, réglages. Quand le matériel est en cause, nous nous déplaçons.',
  },
  {
    question: 'Que contient une sauvegarde ?',
    answer:
      'Nous définissons avec vous ce qui est essentiel : documents, bases de données, messagerie, fichiers de gestion. Nous vérifions aussi régulièrement qu’elle peut être restaurée.',
  },
  {
    question: 'Faut-il un contrat pour être accompagné ?',
    answer:
      'Non. Vous pouvez nous solliciter à la demande ou convenir d’un suivi régulier. Nous précisons ensemble le périmètre avant de commencer.',
  },
  {
    question: 'Pouvez-vous gérer notre messagerie professionnelle ?',
    answer:
      'Oui : création des comptes, configuration sur les postes et les téléphones, organisation des accès et conseils de sécurité.',
  },
  {
    question: 'Pouvez-vous former nos équipes ?',
    answer:
      'Oui. Nous proposons de courtes prises en main sur les outils du quotidien et les bons réflexes de sécurité, adaptées à votre équipe.',
  },
];

const board = [
  {
    column: 'Nouveau',
    cards: [
      { title: 'Accès à la messagerie', meta: 'Direction' },
      { title: 'Nouveau poste à configurer', meta: 'Accueil' },
    ],
  },
  { column: 'En cours', cards: [{ title: 'Sauvegarde hebdomadaire', meta: 'Infrastructure' }] },
  {
    column: 'Résolu',
    cards: [
      { title: 'Imprimante hors ligne', meta: 'Comptabilité' },
      { title: 'Mise à jour des postes', meta: 'Bureaux' },
    ],
  },
];

function level(score: number, answered: number) {
  if (answered === 0)
    return { label: 'Répondez aux questions pour obtenir votre résultat.', tone: 'idle' };
  if (score <= 2) return { label: 'À renforcer en priorité', tone: 'low' };
  if (score <= 4) return { label: 'Une base à consolider', tone: 'mid' };
  return { label: 'Plutôt solide, à entretenir', tone: 'high' };
}

export function ITSupportPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const answered = questions.filter((question) => answers[question.id] !== undefined).length;
  const score = questions.filter((question) => answers[question.id] === true).length;
  const gaps = questions.filter((question) => answers[question.id] === false);
  const result = level(score, answered);
  const circumference = 2 * Math.PI * 52;

  return (
    <div className="svc svc--support">
      <PageMeta
        description="Assistance utilisateurs, maintenance, sauvegardes, comptes et conseils : un interlocuteur technique pour vos postes, votre messagerie et votre réseau."
        literal
        title="Support informatique et infrastructure pour PME | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Assistance et infrastructure
              </span>
              <h1>Infrastructure informatique et support technique</h1>
              <p className="svc-tagline">
                Un interlocuteur technique pour que l’informatique ne freine jamais votre activité.
              </p>
              <p className="svc-lead">
                Postes de travail, messagerie, logiciels, sauvegardes, réseau : nous assurons
                l’assistance et la maintenance courante de votre environnement informatique,
                ponctuellement ou de façon régulière, et nous vous aidons à le faire évoluer au bon
                rythme.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Assistance à distance ou sur place
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Demandes suivies et documentées
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Conseils d’évolution
                </li>
              </ul>
              <div className="svc-actions">
                <Link className="btn btn--primary btn--lg" to="/request-quote?service=it-support">
                  Demander un audit <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#bilan">
                  Faire le bilan express
                </a>
              </div>
            </div>

            <div aria-hidden="true" className="sup-board">
              <div className="sup-board__bar">
                Suivi des demandes<span className="console__tag">Illustration</span>
              </div>
              <div className="sup-board__cols">
                {board.map((col) => (
                  <div className="sup-col" key={col.column}>
                    <p className="sup-col__title">
                      {col.column}
                      <span>{col.cards.length}</span>
                    </p>
                    {col.cards.map((card) => (
                      <div className="sup-card" key={card.title}>
                        <strong>{card.title}</strong>
                        <small>{card.meta}</small>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="bilan">
        <div className="container">
          <div className="block-head">
            <h2>Le bilan express de votre informatique</h2>
            <p>
              Six questions pour repérer les points fragiles. Les réponses restent sur cette page :
              rien n’est envoyé.
            </p>
          </div>
          <div className="sup-check">
            <ol className="sup-questions">
              {questions.map((question, index) => (
                <li className="card sup-q" key={question.id}>
                  <p>
                    <span>{index + 1}</span>
                    {question.text}
                  </p>
                  <div
                    aria-label={`Réponse à la question ${index + 1}`}
                    className="svc-segmented"
                    role="group"
                  >
                    <button
                      aria-pressed={answers[question.id] === true}
                      onClick={() => setAnswers((a) => ({ ...a, [question.id]: true }))}
                      type="button"
                    >
                      Oui
                    </button>
                    <button
                      aria-pressed={answers[question.id] === false}
                      onClick={() => setAnswers((a) => ({ ...a, [question.id]: false }))}
                      type="button"
                    >
                      Non
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <aside aria-live="polite" className={`sup-result sup-result--${result.tone}`}>
              <div className="sup-ring">
                <svg aria-hidden="true" viewBox="0 0 120 120">
                  <circle className="sup-ring__track" cx="60" cy="60" r="52" />
                  <circle
                    className="sup-ring__value"
                    cx="60"
                    cy="60"
                    r="52"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - score / questions.length)}
                  />
                </svg>
                <strong>
                  {score}
                  <small>/{questions.length}</small>
                </strong>
              </div>
              <p className="sup-result__label">{result.label}</p>
              {gaps.length > 0 && (
                <div className="sup-gaps">
                  <h3>Nos premières recommandations</h3>
                  <CheckList items={gaps.map((gap) => gap.fix)} literal />
                </div>
              )}
              <Link className="btn btn--primary btn--block" to="/request-quote?service=it-support">
                Demander un audit complet <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="block-head">
            <h2>Quel niveau d’accompagnement ?</h2>
            <p>
              Le bon niveau dépend de la taille de votre structure et de vos besoins. Nous précisons
              le périmètre avant de commencer.
            </p>
          </div>
          <div className="grid grid--4">
            {formulas.map((formula) => (
              <article className="card sup-formula" key={formula.title}>
                <h3>{formula.title}</h3>
                <p className="sup-formula__for">{formula.for}</p>
                <CheckList items={formula.items} literal />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="block-head">
            <h2>Ce que nous prenons en charge</h2>
          </div>
          <div className="grid grid--3">
            {areas.map(({ icon: Icon, title, text }) => (
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
            <h2>Comment démarre un accompagnement</h2>
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
        <div className="container">
          <div className="block-head">
            <h2>Pour quelles structures ?</h2>
          </div>
          <div className="grid grid--3">
            {audiences.map((item) => (
              <article className="card capability" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Ce qu’il nous faut pour commencer</h3>
            <CheckList
              items={[
                'La liste des postes, logiciels et services utilisés',
                'Les personnes qui utilisent l’informatique et leurs besoins',
                'Les accès administrateur, transmis de façon sécurisée',
                'Les problèmes récurrents déjà observés',
                'Votre budget et vos priorités',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Un inventaire et un état de votre infrastructure',
                'Des sauvegardes configurées et vérifiées',
                'Des comptes et des accès organisés',
                'Un plan d’amélioration priorisé',
                'Un point de contact technique identifié',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur le support</h2>
            <p>Décrivez votre structure dans votre demande : nous adaptons la réponse.</p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Décrivez votre structure et votre environnement : nous proposons un audit et une formule adaptée."
        literal
        title="Besoin d’un appui technique régulier ?"
      />
    </div>
  );
}
