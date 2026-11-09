export type ServiceId =
  | 'computerMaintenance'
  | 'equipmentInstallation'
  | 'networkInstallation'
  | 'videoSurveillance'
  | 'itSupport'
  | 'equipmentSales';

export type ServiceIconName =
  'wrench' | 'monitor' | 'network' | 'camera' | 'lifeBuoy' | 'shoppingBag';

export type Service = {
  id: ServiceId;
  slug: string;
  icon: ServiceIconName;
  image: string;
  scopes: string[];
  technologies: string[];
  benefits: string[];
  questions: Array<{ question: string; answer: string }>;
  related: ServiceId[];
};

const image = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1400&q=85`;

export const services: Service[] = [
  {
    id: 'computerMaintenance',
    slug: 'computer-maintenance',
    icon: 'wrench',
    image: image('photo-1581092921461-eab62e97a780'),
    scopes: [
      'maintenance.scope.0',
      'maintenance.scope.1',
      'maintenance.scope.2',
      'maintenance.scope.3',
      'maintenance.scope.4',
      'maintenance.scope.5',
    ],
    technologies: [
      'maintenance.technology.0',
      'maintenance.technology.1',
      'maintenance.technology.2',
      'maintenance.technology.3',
    ],
    benefits: ['maintenance.benefit.0', 'maintenance.benefit.1', 'maintenance.benefit.2'],
    questions: [
      { question: 'maintenance.faq.0.question', answer: 'maintenance.faq.0.answer' },
      { question: 'maintenance.faq.1.question', answer: 'maintenance.faq.1.answer' },
    ],
    related: ['equipmentInstallation', 'itSupport', 'equipmentSales'],
  },
  {
    id: 'equipmentInstallation',
    slug: 'equipment-installation',
    icon: 'monitor',
    image: image('photo-1581092580497-e0d23cbdf1dc'),
    scopes: [
      'installation.scope.0',
      'installation.scope.1',
      'installation.scope.2',
      'installation.scope.3',
      'installation.scope.4',
    ],
    technologies: [
      'installation.technology.0',
      'installation.technology.1',
      'installation.technology.2',
      'installation.technology.3',
    ],
    benefits: ['installation.benefit.0', 'installation.benefit.1', 'installation.benefit.2'],
    questions: [
      { question: 'installation.faq.0.question', answer: 'installation.faq.0.answer' },
      { question: 'installation.faq.1.question', answer: 'installation.faq.1.answer' },
    ],
    related: ['computerMaintenance', 'networkInstallation', 'equipmentSales'],
  },
  {
    id: 'networkInstallation',
    slug: 'network-installation',
    icon: 'network',
    image: image('photo-1558494949-ef010cbdcc31'),
    scopes: [
      'network.scope.0',
      'network.scope.1',
      'network.scope.2',
      'network.scope.3',
      'network.scope.4',
      'network.scope.5',
    ],
    technologies: [
      'network.technology.0',
      'network.technology.1',
      'network.technology.2',
      'network.technology.3',
    ],
    benefits: ['network.benefit.0', 'network.benefit.1', 'network.benefit.2'],
    questions: [
      { question: 'network.faq.0.question', answer: 'network.faq.0.answer' },
      { question: 'network.faq.1.question', answer: 'network.faq.1.answer' },
    ],
    related: ['equipmentInstallation', 'videoSurveillance', 'itSupport'],
  },
  {
    id: 'videoSurveillance',
    slug: 'video-surveillance',
    icon: 'camera',
    image: image('photo-1557597774-9d273605dfa9'),
    scopes: [
      'surveillance.scope.0',
      'surveillance.scope.1',
      'surveillance.scope.2',
      'surveillance.scope.3',
      'surveillance.scope.4',
      'surveillance.scope.5',
    ],
    technologies: [
      'surveillance.technology.0',
      'surveillance.technology.1',
      'surveillance.technology.2',
      'surveillance.technology.3',
    ],
    benefits: ['surveillance.benefit.0', 'surveillance.benefit.1', 'surveillance.benefit.2'],
    questions: [
      { question: 'surveillance.faq.0.question', answer: 'surveillance.faq.0.answer' },
      { question: 'surveillance.faq.1.question', answer: 'surveillance.faq.1.answer' },
    ],
    related: ['networkInstallation', 'equipmentInstallation', 'itSupport'],
  },
  {
    id: 'itSupport',
    slug: 'it-support',
    icon: 'lifeBuoy',
    image: image('photo-1581091226825-a6a2a5aee158'),
    scopes: [
      'support.scope.0',
      'support.scope.1',
      'support.scope.2',
      'support.scope.3',
      'support.scope.4',
    ],
    technologies: [
      'support.technology.0',
      'support.technology.1',
      'support.technology.2',
      'support.technology.3',
    ],
    benefits: ['support.benefit.0', 'support.benefit.1', 'support.benefit.2'],
    questions: [
      { question: 'support.faq.0.question', answer: 'support.faq.0.answer' },
      { question: 'support.faq.1.question', answer: 'support.faq.1.answer' },
    ],
    related: ['computerMaintenance', 'networkInstallation', 'equipmentInstallation'],
  },
  {
    id: 'equipmentSales',
    slug: 'it-equipment-sales',
    icon: 'shoppingBag',
    image: image('photo-1518770660439-4636190af475'),
    scopes: [
      'sales.scope.0',
      'sales.scope.1',
      'sales.scope.2',
      'sales.scope.3',
      'sales.scope.4',
      'sales.scope.5',
    ],
    technologies: [
      'sales.technology.0',
      'sales.technology.1',
      'sales.technology.2',
      'sales.technology.3',
    ],
    benefits: ['sales.benefit.0', 'sales.benefit.1', 'sales.benefit.2'],
    questions: [
      { question: 'sales.faq.0.question', answer: 'sales.faq.0.answer' },
      { question: 'sales.faq.1.question', answer: 'sales.faq.1.answer' },
    ],
    related: ['equipmentInstallation', 'computerMaintenance', 'networkInstallation'],
  },
];

export type Product = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
};

export const productCategories = [
  'computers',
  'components',
  'displays',
  'printing',
  'networking',
  'security',
  'accessories',
  'officeEquipment',
  'officeSupplies',
] as const;

export const products: Product[] = [
  {
    id: 'business-laptop',
    category: 'computers',
    title: 'product.laptop',
    description: 'product.laptopDescription',
    image: image('photo-1496181133206-80ce9b88a853'),
  },
  {
    id: 'desktop-workstation',
    category: 'computers',
    title: 'product.workstation',
    description: 'product.workstationDescription',
    image: image('photo-1593640408182-31c70c8268f5'),
  },
  {
    id: 'computer-components',
    category: 'components',
    title: 'product.components',
    description: 'product.componentsDescription',
    image: image('photo-1518770660439-4636190af475'),
  },
  {
    id: 'office-display',
    category: 'displays',
    title: 'product.displays',
    description: 'product.displaysDescription',
    image: image('photo-1527443224154-c4a3942d3acf'),
  },
  {
    id: 'printer-scanner',
    category: 'printing',
    title: 'product.printing',
    description: 'product.printingDescription',
    image: image('photo-1612815154858-60aa4c59eaa6'),
  },
  {
    id: 'network-kit',
    category: 'networking',
    title: 'product.networking',
    description: 'product.networkingDescription',
    image: image('photo-1558494949-ef010cbdcc31'),
  },
  {
    id: 'camera-system',
    category: 'security',
    title: 'product.security',
    description: 'product.securityDescription',
    image: image('photo-1557597774-9d273605dfa9'),
  },
  {
    id: 'computer-accessories',
    category: 'accessories',
    title: 'product.accessories',
    description: 'product.accessoriesDescription',
    image: image('photo-1587829741301-dc798b83add3'),
  },
  {
    id: 'office-equipment',
    category: 'officeEquipment',
    title: 'product.officeEquipment',
    description: 'product.officeEquipmentDescription',
    image: image('photo-1497366754035-f200968a6e72'),
  },
  {
    id: 'office-supplies',
    category: 'officeSupplies',
    title: 'product.officeSupplies',
    description: 'product.officeSuppliesDescription',
    image: image('photo-1455390582262-044cdead277a'),
  },
];

export const faqItems = [
  { category: 'general', question: 'faq.general.0.question', answer: 'faq.general.0.answer' },
  { category: 'general', question: 'faq.general.1.question', answer: 'faq.general.1.answer' },
  {
    category: 'maintenance',
    question: 'faq.maintenance.0.question',
    answer: 'faq.maintenance.0.answer',
  },
  {
    category: 'maintenance',
    question: 'faq.maintenance.1.question',
    answer: 'faq.maintenance.1.answer',
  },
  {
    category: 'installation',
    question: 'faq.installation.0.question',
    answer: 'faq.installation.0.answer',
  },
  {
    category: 'installation',
    question: 'faq.installation.1.question',
    answer: 'faq.installation.1.answer',
  },
  { category: 'security', question: 'faq.security.0.question', answer: 'faq.security.0.answer' },
  { category: 'security', question: 'faq.security.1.question', answer: 'faq.security.1.answer' },
  { category: 'products', question: 'faq.products.0.question', answer: 'faq.products.0.answer' },
  { category: 'products', question: 'faq.products.1.question', answer: 'faq.products.1.answer' },
];

export const workSteps = [
  'consultation',
  'diagnosis',
  'proposal',
  'intervention',
  'followUp',
] as const;
export const industries = [
  'smallBusiness',
  'offices',
  'education',
  'retail',
  'organizations',
  'individuals',
] as const;
