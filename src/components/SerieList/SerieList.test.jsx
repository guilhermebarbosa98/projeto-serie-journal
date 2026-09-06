import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SerieList from './SerieList';

const series = [
  {
    id: 1,
    title: 'Breaking Bad',
    seasons: 5,
    releaseDate: '2008-01-20',
    director: 'Vince Gilligan',
    production: 'AMC',
    category: 'Drama',
    watchedAt: '2023-03-10',
  },
  {
    id: 2,
    title: 'Stranger Things',
    seasons: 4,
    releaseDate: '2016-07-15',
    director: 'Duffer Brothers',
    production: 'Netflix',
    category: 'Sci-Fi',
    watchedAt: '2023-06-22',
  },
];

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('SerieList', () => {
  it('exibe um indicador de carregamento quando loading é verdadeiro', () => {
    renderWithRouter(<SerieList series={[]} loading onDelete={vi.fn()} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('exibe mensagem de erro com botão de tentar novamente', async () => {
    const onRetry = vi.fn();
    renderWithRouter(
      <SerieList series={[]} error="Falha ao carregar" onRetry={onRetry} onDelete={vi.fn()} />
    );

    expect(screen.getByText('Falha ao carregar')).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: /tentar novamente/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('exibe estado vazio quando não há séries cadastradas', () => {
    renderWithRouter(<SerieList series={[]} onDelete={vi.fn()} />);
    expect(screen.getByText(/ainda não cadastrou nenhuma série/i)).toBeInTheDocument();
  });

  it('lista todas as séries recebidas via props', () => {
    renderWithRouter(<SerieList series={series} onDelete={vi.fn()} />);
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
    expect(screen.getByText('2 de 2 séries')).toBeInTheDocument();
  });

  it('filtra as séries de acordo com o termo de busca', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SerieList series={series} onDelete={vi.fn()} />);

    await user.type(
      screen.getByPlaceholderText(/buscar por título/i),
      'stranger'
    );

    expect(screen.queryByText('Breaking Bad')).not.toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
    expect(screen.getByText('1 de 2 séries')).toBeInTheDocument();
  });

  it('exibe mensagem quando a busca não encontra resultados', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SerieList series={series} onDelete={vi.fn()} />);

    await user.type(screen.getByPlaceholderText(/buscar por título/i), 'inexistente');

    expect(screen.getByText(/nenhuma série encontrada/i)).toBeInTheDocument();
  });
});
