import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SerieForm from './SerieForm';

async function preencherFormularioValido(user) {
  await user.type(screen.getByLabelText(/título/i), 'Dark');
  await user.type(screen.getByLabelText(/número de temporadas/i), '3');

  const [releaseDate, watchedAt] = screen.getAllByLabelText(/data/i);
  await user.type(releaseDate, '2017-12-01');
  await user.type(screen.getByLabelText(/diretor/i), 'Baran bo Odar');
  await user.type(screen.getByLabelText(/produtora/i), 'Netflix');

  await user.click(screen.getByRole('combobox', { name: /categoria/i }));
  await user.click(await screen.findByRole('option', { name: 'Suspense' }));

  await user.type(watchedAt, '2023-08-18');
}

describe('SerieForm', () => {
  it('exibe mensagens de erro ao submeter o formulário vazio', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SerieForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /cadastrar série/i }));

    expect(await screen.findByText(/informe o título da série/i)).toBeInTheDocument();
    expect(screen.getByText(/revise os campos destacados/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('chama onSubmit com os dados corretos quando o formulário é válido', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue({});

    render(<SerieForm onSubmit={onSubmit} />);
    await preencherFormularioValido(user);

    await user.click(screen.getByRole('button', { name: /cadastrar série/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const payload = onSubmit.mock.calls[0][0];
    expect(payload).toMatchObject({
      title: 'Dark',
      seasons: 3,
      director: 'Baran bo Odar',
      production: 'Netflix',
      category: 'Suspense',
    });
    expect(typeof payload.seasons).toBe('number');
  });

  it('exibe mensagem de erro quando a chamada à API falha', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error('network error'));

    render(<SerieForm onSubmit={onSubmit} />);
    await preencherFormularioValido(user);
    await user.click(screen.getByRole('button', { name: /cadastrar série/i }));

    expect(
      await screen.findByText(/não foi possível salvar a série/i)
    ).toBeInTheDocument();
  });

  it('pré-preenche os campos quando initialData é informado (modo edição)', () => {
    render(
      <SerieForm
        initialData={{
          id: 1,
          title: 'Breaking Bad',
          seasons: 5,
          releaseDate: '2008-01-20',
          director: 'Vince Gilligan',
          production: 'AMC',
          category: 'Drama/Crime',
          watchedAt: '2023-03-10',
        }}
        onSubmit={vi.fn()}
        submitLabel="Salvar alterações"
      />
    );

    expect(screen.getByLabelText(/título/i)).toHaveValue('Breaking Bad');
    expect(screen.getByLabelText(/número de temporadas/i)).toHaveValue(5);
    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
  });
});
