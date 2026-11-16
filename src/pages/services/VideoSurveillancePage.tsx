import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Camera,
  Cctv,
  Check,
  Download,
  HardDrive,
  Moon,
  Server,
  ShieldAlert,
  Smartphone,
} from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../../components/CTASection';
import { CheckList, FaqList } from '../../components/ContentSections';
import { PageMeta } from '../../components/PageMeta';
import './video-surveillance.css';

type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  camera: string;
  why: string;
  caution: string;
};

const zones: Zone[] = [
  {
    id: 'entry',
    label: 'Entrée',
    x: 50,
    y: 88,
    camera: 'Caméra dôme intérieure, face à la porte',
    why: 'Elle permet de voir qui entre, au niveau du visage, et à quel moment.',
    caution: 'Évitez le contre-jour face à une porte vitrée : l’image devient illisible.',
  },
  {
    id: 'till',
    label: 'Caisse',
    x: 26,
    y: 62,
    camera: 'Dôme grand angle au-dessus du comptoir',
    why: 'Elle couvre le comptoir, les échanges et le tiroir-caisse.',
    caution: 'Limitez le champ à ce qui vous appartient et évitez de filmer la saisie des codes.',
  },
  {
    id: 'hall',
    label: 'Salle et rayons',
    x: 52,
    y: 44,
    camera: 'Dôme grand angle, installé en hauteur',
    why: 'Elle offre une vue d’ensemble de la salle et de la circulation.',
    caution: 'Choisissez la hauteur pour éviter les angles morts derrière les rayons.',
  },
  {
    id: 'stock',
    label: 'Réserve',
    x: 80,
    y: 22,
    camera: 'Caméra discrète avec vision nocturne',
    why: 'Elle surveille l’accès et les étagères, y compris quand le magasin est fermé.',
    caution: 'Prévoyez un éclairage minimal ou comptez sur l’infrarouge de la caméra.',
  },
  {
    id: 'outside',
    label: 'Parking et façade',
    x: 10,
    y: 20,
    camera: 'Caméra bullet extérieure résistante aux intempéries',
    why: 'Sa portée et sa visibilité dissuadent et couvrent accès, véhicules et façade.',
    caution:
      'Protégez les connexions de l’eau et vérifiez la vision de nuit sur la distance voulue.',
  },
];

const qualities = [
  { id: '720', label: 'HD (720p)', mbps: 1 },
  { id: '1080', label: 'Full HD (1080p)', mbps: 2 },
  { id: '4mp', label: '4 mégapixels', mbps: 3 },
  { id: '4k', label: '8 mégapixels (4K)', mbps: 5 },
];
const diskSizes = [1, 2, 4, 6, 8, 10, 12, 16];

const cameraTypes = [
  {
    icon: Camera,
    title: 'Caméra dôme',
    usage: 'Intérieur : couloirs, boutiques, bureaux',
    text: 'Discrète et résistante aux manipulations. Difficile de voir où elle regarde.',
  },
  {
    icon: Cctv,
    title: 'Caméra bullet (tube)',
    usage: 'Extérieur : façades, parking, cour',
    text: 'Bien visible donc dissuasive. Choisissez une protection adaptée aux intempéries.',
  },
  {
    icon: HardDrive,
    title: 'Analogique HD + enregistreur DVR',
    usage: 'Remplacer ou étendre un système existant',
    text: 'Peut parfois réutiliser le câblage coaxial déjà en place.',
  },
  {
    icon: Server,
    title: 'Caméra IP + enregistreur NVR (PoE)',
    usage: 'Nouvelle installation, haute définition',
    text: 'Un seul câble réseau pour l’image et l’alimentation ; évolutif.',
  },
];

const features = [
  {
    icon: Moon,
    title: 'Vision nocturne',
    text: 'Des images exploitables même sans éclairage, selon la portée de la caméra.',
  },
  {
    icon: Activity,
    title: 'Détection de mouvement',
    text: 'Repérez rapidement les moments utiles et économisez de l’espace de stockage.',
  },
  {
    icon: Smartphone,
    title: 'Accès à distance',
    text: 'Consultez vos caméras depuis votre téléphone ou votre ordinateur.',
  },
  {
    icon: Download,
    title: 'Export de vidéos',
    text: 'Récupérez un extrait précis pour le conserver ou le transmettre.',
  },
];

const steps = [
  {
    title: 'Visite et repérage',
    text: 'Nous parcourons les lieux avec vous et identifions les zones à surveiller en priorité.',
  },
  { title: 'Proposition', text: 'Plan avec la position des caméras, liste du matériel et devis.' },
  { title: 'Installation', text: 'Pose, câblage, installation de l’enregistreur et du stockage.' },
  {
    title: 'Réglages et tests',
    text: 'Cadrage, netteté, détection de mouvement, contrôle de jour et de nuit.',
  },
  {
    title: 'Prise en main',
    text: 'Nous vous montrons comment consulter, rechercher et exporter une vidéo.',
  },
];

const faq = [
  {
    question: 'Combien de temps garde-t-on les enregistrements ?',
    answer:
      'Cela dépend de la capacité du disque, de la qualité d’image et du nombre de caméras. Utilisez le calculateur ci-dessus pour une première estimation ; nous la précisons lors de la visite.',
  },
  {
    question: 'Peut-on voir les caméras à distance ?',
    answer:
      'Oui, si le lieu dispose d’une connexion Internet. Nous configurons l’application sur votre téléphone et sur votre ordinateur.',
  },
  {
    question: 'Les caméras voient-elles la nuit ?',
    answer:
      'La plupart des caméras actuelles disposent d’une vision nocturne infrarouge. Nous choisissons la portée selon la distance à couvrir.',
  },
  {
    question: 'Que se passe-t-il en cas de coupure d’électricité ?',
    answer:
      'Sans protection, le système s’arrête. Nous recommandons un onduleur pour l’enregistreur et le réseau afin de poursuivre l’enregistrement pendant les coupures courtes.',
  },
  {
    question: 'Y a-t-il des règles sur ce que l’on peut filmer ?',
    answer:
      'Il est conseillé de limiter le champ des caméras aux zones qui vous appartiennent et d’indiquer leur présence. Renseignez-vous sur les règles locales applicables ; nous vous conseillons sur l’orientation.',
  },
  {
    question: 'Pouvez-vous réparer un système déjà installé ?',
    answer:
      'Oui. Nous diagnostiquons caméras, câbles, enregistreur et disque, puis nous réparons ou nous proposons un remplacement partiel.',
  },
];

const wall = ['Entrée', 'Parking', 'Caisse', 'Réserve', 'Cour', 'Atelier'];

export function VideoSurveillancePage() {
  const [zoneId, setZoneId] = useState('entry');
  const zone = zones.find((item) => item.id === zoneId)!;

  const [cameras, setCameras] = useState(4);
  const [quality, setQuality] = useState('1080');
  const [mode, setMode] = useState<'continuous' | 'motion'>('continuous');
  const [days, setDays] = useState(30);

  const estimate = useMemo(() => {
    const mbps = qualities.find((item) => item.id === quality)!.mbps;
    const perDay = mbps * 10.8 * (mode === 'motion' ? 0.35 : 1);
    const totalGb = perDay * cameras * days;
    const needTb = (totalGb * 1.15) / 1000;
    const disk = diskSizes.find((size) => size >= needTb);
    return { totalGb, disk };
  }, [cameras, days, mode, quality]);

  const volume =
    estimate.totalGb >= 1000
      ? `${(estimate.totalGb / 1000).toFixed(1)} To`
      : `${Math.round(estimate.totalGb)} Go`;

  return (
    <div className="svc svc--cctv">
      <PageMeta
        description="Étude des zones, caméras intérieures et extérieures, enregistreur et accès à distance : vidéosurveillance pour commerces, entrepôts, bureaux et résidences."
        literal
        title="Installation de caméras de vidéosurveillance CCTV | Gedeon"
      />

      <section className="svc-hero on-dark">
        <div className="container">
          <div className="svc-hero__layout">
            <div className="svc-hero__copy">
              <span className="badge">
                <span className="badge__dot" />
                Caméras et enregistrement
              </span>
              <h1>Vidéosurveillance et caméras de sécurité</h1>
              <p className="svc-tagline">
                Voir ce qui compte, de jour comme de nuit, même à distance.
              </p>
              <p className="svc-lead">
                Nous étudions vos zones sensibles, choisissons les caméras adaptées à chaque
                emplacement et installons un système d’enregistrement fiable, avec consultation à
                distance sur téléphone ou ordinateur. Vous savez ce qui est filmé, où, et comment
                retrouver une vidéo.
              </p>
              <ul className="svc-points">
                <li>
                  <Check aria-hidden="true" size={16} />
                  Implantation étudiée sur place
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Enregistrement et accès à distance
                </li>
                <li>
                  <Check aria-hidden="true" size={16} />
                  Prise en main expliquée
                </li>
              </ul>
              <div className="svc-actions">
                <Link
                  className="btn btn--primary btn--lg"
                  to="/request-quote?service=video-surveillance"
                >
                  Demander un devis <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <a className="btn btn--secondary btn--lg" href="#plan">
                  Voir un plan d’implantation
                </a>
              </div>
            </div>

            <div aria-hidden="true" className="cctv-wall">
              <div className="cctv-wall__bar">
                <span className="cctv-rec">REC</span>
                Vue des caméras
                <span className="console__tag">Illustration</span>
              </div>
              <div className="cctv-wall__grid">
                {wall.map((name, index) => (
                  <div className="cctv-cam" key={name}>
                    <span className="cctv-cam__label">
                      CAM 0{index + 1} · {name}
                    </span>
                    <span className="cctv-cam__time">14:32:0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="cctv-wall__foot">
                <Smartphone size={14} /> Accès à distance actif
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="plan">
        <div className="container">
          <div className="block-head">
            <h2>Où placer les caméras ?</h2>
            <p>
              Exemple d’un petit commerce. Touchez une zone : voici le type de caméra que nous
              recommanderions et pourquoi.
            </p>
          </div>
          <div className="cctv-plan">
            <div className="cctv-plan__map">
              <svg aria-hidden="true" viewBox="0 0 480 320">
                <rect className="plan-outside" height="318" rx="10" width="478" x="1" y="1" />
                <rect className="plan-room" height="200" rx="6" width="300" x="150" y="70" />
                <rect
                  className="plan-room plan-room--stock"
                  height="80"
                  width="110"
                  x="340"
                  y="70"
                />
                <rect className="plan-furniture" height="14" width="90" x="170" y="205" />
                <rect className="plan-furniture" height="12" width="60" x="190" y="130" />
                <rect className="plan-furniture" height="12" width="60" x="280" y="130" />
                <rect className="plan-furniture" height="12" width="60" x="190" y="165" />
                <rect className="plan-furniture" height="12" width="60" x="280" y="165" />
                <path className="plan-door" d="M270 270 h60" />
                <text className="plan-text" x="26" y="150">
                  Parking
                </text>
                <text className="plan-text" x="350" y="125">
                  Réserve
                </text>
                <text className="plan-text" x="190" y="248">
                  Caisse
                </text>
              </svg>
              {zones.map((item) => (
                <button
                  aria-label={item.label}
                  aria-pressed={zoneId === item.id}
                  className="cctv-spot"
                  key={item.id}
                  onClick={() => setZoneId(item.id)}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  type="button"
                >
                  <Camera aria-hidden="true" size={16} />
                </button>
              ))}
            </div>
            <div aria-live="polite" className="card cctv-zone">
              <div className="cctv-zone__tabs">
                {zones.map((item) => (
                  <button
                    aria-pressed={zoneId === item.id}
                    key={item.id}
                    onClick={() => setZoneId(item.id)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <h3>{zone.label}</h3>
              <dl>
                <div>
                  <dt>Caméra recommandée</dt>
                  <dd>{zone.camera}</dd>
                </div>
                <div>
                  <dt>Pourquoi</dt>
                  <dd>{zone.why}</dd>
                </div>
                <div>
                  <dt>Point d’attention</dt>
                  <dd>{zone.caution}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="stockage">
        <div className="container">
          <div className="block-head">
            <h2>Estimez l’espace de stockage nécessaire</h2>
            <p>
              Le disque de l’enregistreur détermine combien de jours vous pouvez revoir. Ajustez les
              paramètres pour une première idée.
            </p>
          </div>
          <div className="cctv-calc">
            <div className="card cctv-calc__form">
              <label className="svc-field">
                <span>
                  Nombre de caméras : <output>{cameras}</output>
                </span>
                <input
                  max={16}
                  min={1}
                  onChange={(event) => setCameras(Number(event.target.value))}
                  type="range"
                  value={cameras}
                />
              </label>
              <label className="svc-field">
                <span>Qualité d’image</span>
                <select
                  className="control"
                  onChange={(event) => setQuality(event.target.value)}
                  value={quality}
                >
                  {qualities.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="svc-field">
                <span>Mode d’enregistrement</span>
                <select
                  className="control"
                  onChange={(event) => setMode(event.target.value as 'continuous' | 'motion')}
                  value={mode}
                >
                  <option value="continuous">Continu</option>
                  <option value="motion">Sur détection de mouvement</option>
                </select>
              </label>
              <label className="svc-field">
                <span>
                  Durée de conservation : <output>{days} jours</output>
                </span>
                <input
                  max={90}
                  min={7}
                  onChange={(event) => setDays(Number(event.target.value))}
                  step={1}
                  type="range"
                  value={days}
                />
              </label>
            </div>
            <div aria-live="polite" className="cctv-calc__result">
              <p className="cctv-calc__label">Volume estimé</p>
              <p className="cctv-calc__value">≈ {volume}</p>
              <p className="cctv-calc__label">Disque conseillé</p>
              <p className="cctv-calc__value cctv-calc__value--accent">
                {estimate.disk ? `${estimate.disk} To` : 'Plusieurs disques'}
              </p>
              <p className="cctv-calc__note">
                Estimation indicative, avec une marge de 15 %. Le volume réel dépend du codec, de la
                scène filmée et des réglages ; nous la précisons lors de la visite.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="block-head">
            <h2>Quelle caméra pour quel emplacement ?</h2>
            <p>Nous associons souvent plusieurs types de caméras dans une même installation.</p>
          </div>
          <div className="grid grid--4">
            {cameraTypes.map(({ icon: Icon, title, usage, text }) => (
              <article className="card capability" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{title}</h3>
                <p className="cctv-usage">{usage}</p>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark">
        <div className="container">
          <div className="block-head">
            <h2>De la visite à la mise en service</h2>
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
            <h2>Ce que votre système sait faire</h2>
          </div>
          <div className="grid grid--4">
            {features.map(({ icon: Icon, title, text }) => (
              <article className="card capability" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="svc-callout cctv-privacy">
            <ShieldAlert aria-hidden="true" size={20} />
            <span>
              <strong>Respect de la vie privée</strong>
              Limitez le champ des caméras aux zones qui vous appartiennent et indiquez leur
              présence. Renseignez-vous sur les règles locales applicables ; nous vous conseillons
              sur l’orientation des caméras.
            </span>
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container two-col">
          <article className="card list-card">
            <h3>Ce qui nous aide à proposer le bon système</h3>
            <CheckList
              items={[
                'La liste des zones à surveiller : entrées, caisses, stocks, parking',
                'Un plan des lieux ou quelques photos',
                'L’emplacement possible de l’enregistreur : lieu sûr, ventilé, avec prise électrique',
                'Votre besoin d’accès à distance et la connexion Internet disponible',
                'La durée de conservation souhaitée des enregistrements',
              ]}
              literal
            />
          </article>
          <article className="card list-card list-card--accent on-dark">
            <h3>Ce que vous obtenez</h3>
            <CheckList
              items={[
                'Des caméras posées, réglées et testées',
                'Un enregistrement actif et vérifié',
                'L’accès à distance configuré sur vos appareils',
                'Un mémo pour consulter et exporter une vidéo',
              ]}
              literal
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>Questions fréquentes sur la vidéosurveillance</h2>
            <p>Une question sur votre site ? Décrivez-le dans votre demande, nous répondons.</p>
            <Link className="link" to="/faq">
              Toutes les questions <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={faq} literal />
        </div>
      </section>

      <CTASection
        description="Décrivez vos locaux et ce que vous voulez surveiller : nous proposons une visite et un plan d’installation."
        literal
        title="Un lieu à sécuriser ?"
      />
    </div>
  );
}
