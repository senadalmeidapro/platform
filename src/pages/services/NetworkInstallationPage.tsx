import { useState } from 'react';
import { ArrowRight, Check, EyeOff, KeyRound, Network, Split } from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { PageMeta } from '../../components/PageMeta';
import './network-installation.css';

type NodeType = 'cloud' | 'router' | 'switch' | 'ap' | 'device';
type DiagramNode = { id: string; x: number; y: number; type: NodeType; label: string };
type DiagramLink = { from: string; to: string; wifi?: boolean };
type Architecture = {
  id: string;
  label: string;
  summary: string;
  nodes: DiagramNode[];
  links: DiagramLink[];
  facts: Array<[string, string]>;
  equipment: string[];
  warning: string;
};

const architectures: Architecture[] = [
  {
    id: 'home',
    label: 'Maison',
    summary:
      'Un routeur Wi‑Fi bien placé suffit souvent ; un second point d’accès règle les étages et les annexes.',
    nodes: [
      { id: 'net', x: 210, y: 26, type: 'cloud', label: 'Internet' },
      { id: 'rt', x: 210, y: 86, type: 'router', label: 'Routeur Wi‑Fi' },
      { id: 'd1', x: 70, y: 176, type: 'device', label: 'Téléphones' },
      { id: 'd2', x: 160, y: 176, type: 'device', label: 'Ordinateur' },
      { id: 'd3', x: 260, y: 176, type: 'device', label: 'Télévision' },
      { id: 'd4', x: 350, y: 176, type: 'device', label: 'Imprimante' },
    ],
    links: [
      { from: 'net', to: 'rt' },
      { from: 'rt', to: 'd1', wifi: true },
      { from: 'rt', to: 'd2', wifi: true },
      { from: 'rt', to: 'd3', wifi: true },
      { from: 'rt', to: 'd4', wifi: true },
    ],
    facts: [
      ['Câblage', 'Aucun ou minimal'],
      ['Points d’accès', '1, ou 2 s’il y a un étage'],
      ['Réseaux', 'Principal + invités'],
    ],
    equipment: [
      'Routeur Wi‑Fi',
      'Second point d’accès si nécessaire',
      'Câble vers le point d’accès',
    ],
    warning: 'Les murs épais et les étages réduisent fortement la portée du Wi‑Fi.',
  },
  {
    id: 'office',
    label: 'Bureau',
    summary:
      'Postes fixes en câble, Wi‑Fi pour les mobiles, imprimante partagée et réseau invités séparé.',
    nodes: [
      { id: 'net', x: 210, y: 26, type: 'cloud', label: 'Internet' },
      { id: 'rt', x: 210, y: 76, type: 'router', label: 'Routeur' },
      { id: 'sw', x: 210, y: 126, type: 'switch', label: 'Switch' },
      { id: 'ap', x: 350, y: 126, type: 'ap', label: 'Point d’accès' },
      { id: 'pc1', x: 60, y: 196, type: 'device', label: 'Poste 1' },
      { id: 'pc2', x: 140, y: 196, type: 'device', label: 'Poste 2' },
      { id: 'pr', x: 220, y: 196, type: 'device', label: 'Imprimante' },
      { id: 'mob', x: 350, y: 196, type: 'device', label: 'Mobiles' },
    ],
    links: [
      { from: 'net', to: 'rt' },
      { from: 'rt', to: 'sw' },
      { from: 'sw', to: 'ap' },
      { from: 'sw', to: 'pc1' },
      { from: 'sw', to: 'pc2' },
      { from: 'sw', to: 'pr' },
      { from: 'ap', to: 'mob', wifi: true },
    ],
    facts: [
      ['Câblage', 'RJ45 pour les postes fixes'],
      ['Points d’accès', '1 ou plus selon la surface'],
      ['Réseaux', 'Équipe + invités'],
    ],
    equipment: ['Routeur', 'Switch', 'Point d’accès Wi‑Fi', 'Prises RJ45 et câbles repérés'],
    warning: 'Brancher en câble tout ce qui est fixe soulage le Wi‑Fi et stabilise les débits.',
  },
  {
    id: 'shop',
    label: 'Commerce',
    summary:
      'La caisse et les terminaux sont isolés du Wi‑Fi des clients pour la sécurité et la stabilité.',
    nodes: [
      { id: 'net', x: 210, y: 26, type: 'cloud', label: 'Internet' },
      { id: 'rt', x: 210, y: 82, type: 'router', label: 'Routeur / pare-feu' },
      { id: 'sw', x: 100, y: 134, type: 'switch', label: 'Réseau caisse' },
      { id: 'ap', x: 320, y: 134, type: 'ap', label: 'Wi‑Fi clients' },
      { id: 'pos', x: 50, y: 200, type: 'device', label: 'Caisse' },
      { id: 'tpe', x: 150, y: 200, type: 'device', label: 'Terminal' },
      { id: 'cl', x: 320, y: 200, type: 'device', label: 'Clients' },
    ],
    links: [
      { from: 'net', to: 'rt' },
      { from: 'rt', to: 'sw' },
      { from: 'rt', to: 'ap' },
      { from: 'sw', to: 'pos' },
      { from: 'sw', to: 'tpe' },
      { from: 'ap', to: 'cl', wifi: true },
    ],
    facts: [
      ['Câblage', 'Caisse et terminaux en filaire'],
      ['Points d’accès', 'Wi‑Fi clients séparé'],
      ['Réseaux', 'Caisse / clients / équipements'],
    ],
    equipment: [
      'Routeur ou pare-feu',
      'Switch',
      'Point d’accès pour les clients',
      'Réseaux séparés',
    ],
    warning: 'Ne mélangez jamais le réseau de la caisse avec celui des clients.',
  },
  {
    id: 'large',
    label: 'Grand site',
    summary:
      'Plusieurs étages ou bâtiments : un cœur de réseau, des switchs répartis et plusieurs points d’accès.',
    nodes: [
      { id: 'net', x: 210, y: 22, type: 'cloud', label: 'Internet' },
      { id: 'rt', x: 210, y: 64, type: 'router', label: 'Routeur / pare-feu' },
      { id: 'core', x: 210, y: 106, type: 'switch', label: 'Switch cœur' },
      { id: 'sl', x: 100, y: 152, type: 'switch', label: 'Switch étage 1' },
      { id: 'sr', x: 320, y: 152, type: 'switch', label: 'Switch étage 2' },
      { id: 'a1', x: 50, y: 214, type: 'ap', label: 'AP' },
      { id: 'a2', x: 150, y: 214, type: 'ap', label: 'AP' },
      { id: 'a3', x: 270, y: 214, type: 'ap', label: 'AP' },
      { id: 'a4', x: 370, y: 214, type: 'ap', label: 'AP' },
    ],
    links: [
      { from: 'net', to: 'rt' },
      { from: 'rt', to: 'core' },
      { from: 'core', to: 'sl' },
      { from: 'core', to: 'sr' },
      { from: 'sl', to: 'a1' },
      { from: 'sl', to: 'a2' },
      { from: 'sr', to: 'a3' },
      { from: 'sr', to: 'a4' },
    ],
    facts: [
      ['Câblage', 'Liaisons entre étages ou bâtiments'],
      ['Points d’accès', 'Plusieurs, répartis'],
      ['Réseaux', 'Plusieurs réseaux virtuels (VLAN)'],
    ],
    equipment: [
      'Routeur / pare-feu',
      'Switch cœur et switchs PoE',
      'Plusieurs points d’accès',
      'Gestion centralisée si possible',
    ],
    warning:
      'Prévoyez l’évolution : ports libres, câblage de qualité et gestion simple à maintenir.',
  },
];

function NetworkDiagram({
  architecture,
  compact = false,
}: {
  architecture: Architecture;
  compact?: boolean;
}) {
  const byId = new Map(architecture.nodes.map((node) => [node.id, node]));
  return (
    <svg
      aria-label={`Schéma réseau : ${architecture.label}`}
      className={`net-diagram ${compact ? 'net-diagram--compact' : ''}`}
      role="img"
      viewBox="0 0 420 240"
    >
      {architecture.links.map((link) => {
        const a = byId.get(link.from)!;
        const b = byId.get(link.to)!;
        return (
          <line
            className={link.wifi ? 'net-link net-link--wifi' : 'net-link'}
            key={`${link.from}-${link.to}`}
            x1={a.x}
            x2={b.x}
            y1={a.y}
            y2={b.y}
          />
        );
      })}
      {architecture.nodes.map((node) => (
        <g className={`net-node net-node--${node.type}`} key={node.id}>
          {node.type === 'cloud' && <circle cx={node.x} cy={node.y} r="15" />}
          {node.type === 'router' && (
            <rect height="24" rx="7" width="58" x={node.x - 29} y={node.y - 12} />
          )}
          {node.type === 'switch' && (
            <rect height="22" rx="6" width="70" x={node.x - 35} y={node.y - 11} />
          )}
          {node.type === 'ap' && (
            <>
              <circle cx={node.x} cy={node.y} r="12" />
              <path
                d={`M${node.x - 6} ${node.y + 1} a8 8 0 0 1 12 0 M${node.x - 3} ${node.y + 4} a4 4 0 0 1 6 0`}
              />
            </>
          )}
          {node.type === 'device' && (
            <rect height="18" rx="5" width="34" x={node.x - 17} y={node.y - 9} />
          )}
          <text x={node.x} y={node.y + (node.type === 'device' ? 24 : 28)}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const comparison = [
  [
    'Stabilité',
    'Très bonne, peu sensible aux interférences',
    'Variable selon les murs, la distance et le nombre d’appareils',
  ],
  ['Vitesse', 'Constante, adaptée aux gros transferts', 'Bonne de près, plus faible à distance'],
  ['Mobilité', 'Appareil relié à une prise', 'Libre de se déplacer dans la zone couverte'],
  ['Installation', 'Demande de passer des câbles', 'Rapide à mettre en place'],
  [
    'Idéal pour',
    'Postes fixes, caisses, imprimantes, caméras',
    'Téléphones, portables, tablettes, invités',
  ],
];

const steps = [
  {
    title: 'Visite et besoins',
    text: 'Repérage des locaux, des usages critiques et du nombre d’appareils.',
    deliverable: 'Liste des besoins et des zones à couvrir',
  },
  {
    title: 'Plan du réseau',
    text: 'Positions des équipements et des câbles, liste du matériel, devis.',
    deliverable: 'Plan d’implantation et devis',
  },
  {
    title: 'Installation',
    text: 'Passage des câbles, pose des prises, installation des équipements actifs.',
    deliverable: 'Câblage posé, prises et ports repérés',
  },
  {
    title: 'Configuration et sécurité',
    text: 'Paramétrage du routeur, du Wi‑Fi, des accès invités et de la sécurité.',
    deliverable: 'Réseaux configurés et protégés',
  },
  {
    title: 'Tests et remise',
    text: 'Mesures de débit et de couverture, schéma du réseau, accès remis au responsable.',
    deliverable: 'Schéma du réseau et accès d’administration',
  },
];

const security = [
  {
    icon: EyeOff,
    title: 'Réseau invités',
    text: 'Vos visiteurs accèdent à Internet sans voir vos ordinateurs, imprimantes ou caméras.',
  },
  {
    icon: KeyRound,
    title: 'Mots de passe et chiffrement',
    text: 'Wi‑Fi protégé en WPA2 ou WPA3, accès d’administration changés et remis au responsable.',
  },
  {
    icon: Split,
    title: 'Séparation des usages',
    text: 'Caisse, bureaux, caméras et visiteurs sur des réseaux distincts quand le site le justifie.',
  },
];

const faq = [
  {
    question: 'Vaut-il mieux du câble ou du Wi‑Fi ?',
    answer:
      'Le câble est plus stable et plus rapide, idéal pour les postes fixes. Le Wi‑Fi est pratique pour les mobiles. Dans la plupart des locaux professionnels, on combine les deux.',
  },
  {
    question: 'Combien de points d’accès faut-il ?',
    answer:
      'Cela dépend de la surface, des murs et du nombre d’appareils. Nous le déterminons lors de la visite plutôt que d’en poser trop ou pas assez.',
  },
  {
    question: 'Pouvez-vous améliorer mon réseau existant ?',
    answer:
      'Oui. Nous mesurons d’abord le débit et la couverture, puis nous corrigeons l’emplacement, la configuration ou le matériel qui pose problème.',
  },
  {
    question: 'Faut-il changer d’abonnement Internet ?',
    answer:
      'Pas toujours. Nous vérifions si la lenteur vient de votre réseau interne ou de la connexion fournie par votre opérateur avant de recommander quoi que ce soit.',
  },
  {
    question: 'Peut-on avoir un Wi‑Fi séparé pour les invités ?',
    answer:
      'Oui. Un réseau invités donne accès à Internet sans donner accès à vos ordinateurs, imprimantes ou caméras.',
  },
];

export function NetworkInstallationPage() {
  const [activeId, setActiveId] = useState('office');
  const active = architectures.find((item) => item.id === activeId)!;
  const hero = architectures[1]!;

  return (
    <div className="svc svc--network">
      <PageMeta
        description="Étude, câblage, Wi‑Fi, switchs et sécurité : un réseau stable et bien couvert pour vos bureaux, commerces, écoles et logements."
        literal
        title="Installation et configuration de réseau Wi‑Fi et filaire | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Réseau filaire et Wi‑Fi
              </span>
              <h1>Installation et configuration réseau</h1>
              <p className="svc-tagline">
                Un réseau stable, bien couvert et sécurisé, du câble au Wi‑Fi.
              </p>
              <p className="svc-lead">
                Nous concevons et installons des réseaux adaptés à vos locaux : couverture Wi‑Fi
                complète, câblage propre, accès Internet partagé entre tous vos appareils et
                paramètres de sécurité de base. Chaque installation commence par une visite des
                lieux.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Étude des locaux et des usages
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Câblage propre et repéré
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Wi‑Fi testé dans chaque zone
                </li>
              </ul>
              <div className="svc-actions">
                <Link
                  className="btn btn--primary btn--lg"
                  to="/request-quote?service=network-installation"
                >
                  Demander un devis <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#architecture">
                  Voir les architectures
                </a>
              </div>
            </div>
            <div className="net-map" aria-hidden="true">
              <div className="net-map__bar">
                <Network size={14} /> Plan du réseau
                <span className="console__tag">Illustration</span>
              </div>
              <NetworkDiagram architecture={hero} />
              <ul className="net-legend">
                <li>
                  <i className="net-legend__wired" />
                  Filaire
                </li>
                <li>
                  <i className="net-legend__wifi" />
                  Wi‑Fi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="architecture">
        <div className="container">
          <div className="block-head">
            <h2>Quelle architecture pour vos locaux ?</h2>
            <p>
              Le bon schéma dépend de la surface, du nombre d’étages et de ce que vous connectez.
              Choisissez votre situation.
            </p>
          </div>
          <div aria-label="Type de lieu" className="svc-segmented net-segmented" role="group">
            {architectures.map((item) => (
              <button
                aria-pressed={activeId === item.id}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="net-arch">
            <div className="card net-arch__diagram">
              <NetworkDiagram architecture={active} />
              <p className="net-arch__summary">{active.summary}</p>
            </div>
            <div className="net-arch__details">
              <dl className="net-facts">
                {active.facts.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <article className="card list-card">
                <h3>Équipements typiques</h3>
                <CheckList items={active.equipment} literal />
              </article>
              <p className="svc-callout">
                <Network aria-hidden="true" size={18} />
                <span>
                  <strong>À retenir</strong>
                  {active.warning}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="block-head">
            <h2>Câble ou Wi‑Fi : que choisir ?</h2>
            <p>
              Dans la plupart des locaux professionnels, on combine les deux : le câble pour ce qui
              est fixe, le Wi‑Fi pour ce qui bouge.
            </p>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">Câble (Ethernet)</th>
                  <th scope="col">Wi‑Fi</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([criterion, cable, wifi]) => (
                  <tr key={criterion}>
                    <th scope="row">{criterion}</th>
                    <td>{cable}</td>
                    <td>{wifi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split__copy net-sticky">
            <h2>Un déploiement en cinq étapes</h2>
            <p>
              Chaque étape produit quelque chose de concret que vous pouvez vérifier avant de passer
              à la suivante.
            </p>
          </div>
          <ol className="net-steps">
            {steps.map((step, index) => (
              <li className="net-step" key={step.title}>
                <span className="net-step__num">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className="net-step__out">
                    <Check aria-hidden="true" size={14} />
                    {step.deliverable}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--dark on-dark">
        <div className="container">
          <div className="block-head">
            <h2>La sécurité fait partie du réseau</h2>
            <p>
              Un réseau rapide mais ouvert à tous n’est pas un bon réseau. Voici ce que nous mettons
              en place.
            </p>
          </div>
          <div className="grid grid--3">
            {security.map(({ icon: Icon, title, text }) => (
              <article className="net-secure" key={title}>
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

      <section className="section">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Ce qui nous aide à bien chiffrer</h3>
            <CheckList
              items={[
                'Un plan ou un croquis des locaux',
                'L’endroit où arrive l’accès Internet (fournisseur, boîtier)',
                'Le nombre approximatif d’appareils et d’utilisateurs',
                'Les usages critiques : visioconférence, caisse, caméras',
                'Les contraintes de passage des câbles : murs, plafonds, étages',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Un réseau installé, mesuré et testé',
                'Un schéma simple et la liste des équipements',
                'Les accès d’administration remis au responsable',
                'Des recommandations pour les évolutions futures',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur le réseau</h2>
            <p>Un doute sur votre situation ? Décrivez vos locaux dans votre demande.</p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Décrivez vos locaux et vos usages : nous proposons une visite et une solution adaptée."
        literal
        title="Un réseau à installer ou à améliorer ?"
      />
    </div>
  );
}
