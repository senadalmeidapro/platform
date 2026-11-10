import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import App from './App';

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
