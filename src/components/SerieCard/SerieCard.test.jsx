import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import SerieCard from './SerieCard';

const serie = {
  id: 1,
  title: 'Fleabag',
  seasons: 2,
  releaseDate: '2016-07-21',
  director: 'Phoebe Waller-Bridge',
  production: 'BBC',
  category: 'Comédia',
  watchedAt: '2024-01-14',
};

function renderRow(props) {
  return render(
    <MemoryRouter>
      <Table>
        <TableBody>
          <SerieCard serie={serie} {...props} />
        </TableBody>
      </Table>
    </MemoryRouter>
  );
}

describe('SerieCard', () => {
  it('renderiza as informações da série', () => {
    renderRow({ onDelete: vi.fn() });
    expect(screen.getByText('Fleabag')).toBeInTheDocument();
    expect(screen.getByText('Phoebe Waller-Bridge')).toBeInTheDocument();
    expect(screen.getByText('BBC')).toBeInTheDocument();
  });

  it('pede confirmação antes de excluir e chama onDelete ao confirmar', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn().mockResolvedValue();
    renderRow({ onDelete });

    await user.click(screen.getByLabelText(/excluir fleabag/i));
    expect(screen.getByText(/tem certeza que deseja excluir/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^excluir$/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('não chama onDelete se o usuário cancelar a exclusão', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderRow({ onDelete });

    await user.click(screen.getByLabelText(/excluir fleabag/i));
    await user.click(screen.getByRole('button', { name: /cancelar/i }));

    expect(onDelete).not.toHaveBeenCalled();
  });
});
