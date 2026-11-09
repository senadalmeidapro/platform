import { Camera, LifeBuoy, MonitorCog, Network, ShoppingBag, Wrench } from 'lucide-react';
import type { ServiceIconName } from '../data/catalog';

const icons = {
  wrench: Wrench,
  monitor: MonitorCog,
  network: Network,
  camera: Camera,
  lifeBuoy: LifeBuoy,
  shoppingBag: ShoppingBag,
} satisfies Record<ServiceIconName, typeof Wrench>;

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}
