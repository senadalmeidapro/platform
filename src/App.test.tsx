import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import App from './App';
import { t } from './content';
import { productCategories, products, services } from './data/catalog';

function renderPath(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('website routes', () => {
  it.each([
    ['/', /Votre technologie/i],
    ['/about', /Un accompagnement technologique/i],
    ['/services', /Des services techniques pour votre environnement informatique/i],
    ['/services/computer-maintenance', /Maintenance et réparation informatique/i],
    ['/services/equipment-installation', /Installation de matériel informatique/i],
    ['/services/network-installation', /Installation et configuration réseau/i],
    ['/services/video-surveillance', /Vidéosurveillance/i],
    ['/services/it-support', /Infrastructure informatique et support technique/i],
    ['/services/it-equipment-sales', /Vente de matériel informatique et de bureau/i],
    ['/products', /Des équipements informatiques et de bureau/i],
    ['/contact', /Parlez-nous de votre besoin/i],
    ['/request-quote', /Demander un devis/i],
    ['/faq', /Questions fréquentes/i],
    ['/privacy-policy', /Politique de confidentialité/i],
    ['/terms', /Conditions générales/i],
    ['/unknown-path', /Cette page est indisponible/i],
  ])('renders %s', async (path, heading) => {
    renderPath(path);
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});

describe('catalogue and contact interactions', () => {
  it('is French only: no language selector is rendered', async () => {
    renderPath('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Votre technologie/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Langue')).not.toBeInTheDocument();
  });

  it('filters products by category and search term', async () => {
    renderPath('/products');
    expect(
      await screen.findByRole('heading', { name: 'Ordinateur portable professionnel' }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Imprimantes et scanners' }));
    expect(
      await screen.findByRole('heading', { name: 'Imprimantes et scanners' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Ordinateur portable professionnel' }),
    ).not.toBeInTheDocument();
  });

  it('does not claim a contact message was delivered without a configured backend', async () => {
    renderPath('/contact');
    fireEvent.change(screen.getByLabelText(/Nom complet/), { target: { value: 'Camille Martin' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail/), {
      target: { value: 'camille@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/), {
      target: { value: '+33123456789' },
    });
    fireEvent.change(screen.getByLabelText(/Service souhaité/), {
      target: { value: 'computer-maintenance' },
    });
    fireEvent.change(screen.getByLabelText(/Objet/), { target: { value: 'Computer diagnostic' } });
    fireEvent.change(screen.getByLabelText(/Comment pouvons-nous vous aider/), {
      target: { value: 'I would like to arrange a computer diagnostic appointment.' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/ }));
    expect(await screen.findByText(/Cette demande n’a pas été envoyée/i)).toBeInTheDocument();
    expect(screen.queryByText('Votre demande a été envoyée.')).not.toBeInTheDocument();
  });
});

describe('dedicated service pages', () => {
  it.each([
    ['/services/computer-maintenance', 'Quel est votre symptôme ?'],
    ['/services/equipment-installation', 'Composez votre installation'],
    ['/services/network-installation', 'Quelle architecture pour vos locaux ?'],
    ['/services/video-surveillance', 'Où placer les caméras ?'],
    ['/services/it-support', 'Le bilan express de votre informatique'],
    ['/services/it-equipment-sales', 'Trouvez votre configuration'],
  ])('%s has its own signature section', async (path, heading) => {
    renderPath(path);
    expect(await screen.findByRole('heading', { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('maintenance: choosing a symptom changes the advice', async () => {
    renderPath('/services/computer-maintenance');
    fireEvent.click(await screen.findByRole('tab', { name: /Virus et publicités/i }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/antivirus/i);
  });

  it('installation: the plan follows the selected equipment', async () => {
    renderPath('/services/equipment-installation');
    const scanner = await screen.findByRole('button', { name: /^Scanner/i });
    fireEvent.click(scanner);
    expect(scanner).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Test de numérisation')).toBeInTheDocument();
  });

  it('network: switching the type of site updates the schema', async () => {
    renderPath('/services/network-installation');
    fireEvent.click(await screen.findByRole('button', { name: 'Commerce' }));
    expect(
      screen.getAllByRole('img', { name: /Schéma réseau : Commerce/i }).length,
    ).toBeGreaterThan(0);
  });

  it('surveillance: the storage estimate reacts to the number of cameras', async () => {
    renderPath('/services/video-surveillance');
    const slider = await screen.findByLabelText(/Nombre de caméras/i);
    fireEvent.change(slider, { target: { value: '16' } });
    expect(screen.getByText(/Disque conseillé/i).nextElementSibling).toHaveTextContent(/To/);
  });

  it('support: the express check scores the answers', async () => {
    renderPath('/services/it-support');
    const yesButtons = await screen.findAllByRole('button', { name: 'Oui' });
    fireEvent.click(yesButtons[0]!);
    fireEvent.click(yesButtons[1]!);
    expect(screen.getByText('À renforcer en priorité')).toBeInTheDocument();
  });

  it('sales: the guide recommends a profile for the chosen usage', async () => {
    renderPath('/services/it-equipment-sales');
    fireEvent.click(await screen.findByRole('button', { name: 'Création graphique ou vidéo' }));
    expect(screen.getByText(/carte graphique dédiée/i)).toBeInTheDocument();
  });
});

describe('desktop mega menu', () => {
  it('shows every service and product category and switches panels on click', async () => {
    renderPath('/');
    const servicesTrigger = await screen.findByRole('button', { name: t('nav.services') });
    const productsTrigger = await screen.findByRole('button', { name: t('nav.products') });

    fireEvent.click(servicesTrigger);
    const servicesPanel = await screen.findByRole('region', { name: t('nav.services') });
    expect(servicesTrigger).toHaveAttribute('aria-expanded', 'true');
    for (const service of services) {
      expect(
        servicesPanel.querySelector(`a[href="/services/${service.slug}"]`),
      ).toBeInTheDocument();
    }
    expect(
      servicesPanel.querySelector('a[href="/services/network-installation"]'),
    ).toBeInTheDocument();

    fireEvent.click(productsTrigger);
    const productsPanel = await screen.findByRole('region', { name: t('nav.products') });
    expect(productsTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(servicesTrigger).toHaveAttribute('aria-expanded', 'false');
    for (const category of productCategories) {
      expect(
        productsPanel.querySelector(`a[href="/products?category=${category}"]`),
      ).toBeInTheDocument();
    }
    expect(
      productsPanel.querySelector('a[href="/request-quote?product=business-laptop"]'),
    ).toBeInTheDocument();

    fireEvent.click(productsTrigger);
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: t('nav.products') })).not.toBeInTheDocument(),
    );
  });

  it('previews the hovered service or product and restores the category feature when idle', async () => {
    renderPath('/');
    fireEvent.click(await screen.findByRole('button', { name: t('nav.services') }));

    const servicePanel = await screen.findByRole('region', { name: t('nav.services') });
    const serviceLink = servicePanel.querySelector<HTMLAnchorElement>(
      'a[href="/services/computer-maintenance"]',
    );
    if (!serviceLink) throw new Error('Computer maintenance link was not rendered');
    fireEvent.mouseEnter(serviceLink);
    const servicePreview = screen.getByRole('img', {
      name: t('services.items.computerMaintenance.imageAlt'),
    });
    expect(servicePreview).toHaveAttribute('src', services[0]?.image);

    const serviceItems = serviceLink.parentElement;
    if (!serviceItems) throw new Error('Service menu items container was not rendered');
    fireEvent.mouseLeave(serviceItems);
    expect(
      screen.getByRole('img', { name: t('services.items.networkInstallation.imageAlt') }),
    ).toHaveAttribute(
      'src',
      services.find((service) => service.id === 'networkInstallation')?.image,
    );

    fireEvent.click(await screen.findByRole('button', { name: t('nav.products') }));
    const productPanel = await screen.findByRole('region', { name: t('nav.products') });
    const productLink = productPanel.querySelector<HTMLAnchorElement>(
      'a[href="/products?category=printing"]',
    );
    if (!productLink) throw new Error('Printing category link was not rendered');
    fireEvent.mouseEnter(productLink);
    const printingProduct = products.find((product) => product.category === 'printing');
    expect(screen.getByRole('img', { name: t('productImages.printing') })).toHaveAttribute(
      'src',
      printingProduct?.image,
    );

    const productItems = productLink.parentElement;
    if (!productItems) throw new Error('Product menu items container was not rendered');
    fireEvent.mouseLeave(productItems);
    expect(screen.getByRole('img', { name: t('productImages.computers') })).toHaveAttribute(
      'src',
      products[0]?.image,
    );
  });

  it('closes on outside click and Escape, returning focus to the active trigger', async () => {
    renderPath('/');
    const servicesTrigger = await screen.findByRole('button', { name: t('nav.services') });
    fireEvent.click(servicesTrigger);
    expect(await screen.findByRole('region', { name: t('nav.services') })).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: t('nav.services') })).not.toBeInTheDocument(),
    );

    fireEvent.click(servicesTrigger);
    expect(await screen.findByRole('region', { name: t('nav.services') })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: t('nav.services') })).not.toBeInTheDocument(),
    );
    expect(servicesTrigger).toHaveFocus();
  });
});

describe('mobile category accordions', () => {
  it('expands both service links and product filters for touch navigation', async () => {
    renderPath('/');
    fireEvent.click(screen.getByRole('button', { name: t('nav.openMenu') }));
    const mobileNavigation = screen.getByRole('navigation', { name: t('nav.mobile') });

    fireEvent.click(within(mobileNavigation).getByRole('button', { name: t('nav.services') }));
    for (const service of services) {
      expect(
        mobileNavigation.querySelector(`a[href="/services/${service.slug}"]`),
      ).toBeInTheDocument();
    }

    fireEvent.click(within(mobileNavigation).getByRole('button', { name: t('nav.products') }));
    for (const category of productCategories) {
      expect(
        mobileNavigation.querySelector(`a[href="/products?category=${category}"]`),
      ).toBeInTheDocument();
    }
    expect(mobileNavigation.querySelector('#mobile-services-submenu')).not.toBeInTheDocument();
  });
});
