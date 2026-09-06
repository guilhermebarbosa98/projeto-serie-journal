import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

function renderNavBar(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <NavBar />
    </MemoryRouter>
  );
}

describe('NavBar', () => {
  it('renderiza os quatro links de navegação', () => {
    renderNavBar();
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cadastrar série/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /minhas séries/i })).toBeInTheDocument();
  });

  it('marca o link correspondente à rota atual como ativo', () => {
    renderNavBar('/series');
    expect(screen.getByRole('link', { name: /minhas séries/i })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: /início/i })).not.toHaveAttribute('aria-current');
  });
});
