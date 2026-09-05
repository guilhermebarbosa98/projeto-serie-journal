import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SerieCard from '../SerieCard/SerieCard';
import './SerieList.css';

function SerieList({ series, onDelete }) {
  const [busca, setBusca] = useState('');

  const seriesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return series;
    return series.filter((serie) =>
      [serie.titulo, serie.diretor, serie.produtora, serie.categoria]
        .join(' ')
        .toLowerCase()
        .includes(termo)
    );
  }, [series, busca]);

  return (
    <div className="serie-list">
      <div className="serie-list__toolbar">
        <label className="serie-list__search">
          <span className="sr-only">Buscar séries</span>
          <input
            type="search"
            placeholder="Buscar por título, diretor, produtora ou categoria..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </label>
        <span className="serie-list__count">
          {seriesFiltradas.length} de {series.length} série{series.length !== 1 && 's'}
        </span>
      </div>

      {seriesFiltradas.length === 0 ? (
        <div className="serie-list__empty">
          {series.length === 0 ? (
            <>
              <p>Você ainda não cadastrou nenhuma série.</p>
              <Link to="/cadastrar" className="btn btn-primary">
                Cadastrar primeira série
              </Link>
            </>
          ) : (
            <p>Nenhuma série encontrada para "{busca}".</p>
          )}
        </div>
      ) : (
        <ul className="serie-list__items">
          {seriesFiltradas.map((serie) => (
            <SerieCard key={serie.id} serie={serie} onDelete={onDelete} />
          ))}
        </ul>
      )}

      {series.length > 0 && (
        <div className="serie-list__footer">
          <Link to="/cadastrar" className="btn btn-ghost">
            Cadastrar nova série
          </Link>
        </div>
      )}
    </div>
  );
}

export default SerieList;
