import { useNavigate } from 'react-router-dom';
import './SerieCard.css';

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

function SerieCard({ serie, onDelete }) {
  const navigate = useNavigate();

  function handleDelete() {
    const confirmado = window.confirm(`Excluir "${serie.titulo}" da sua lista?`);
    if (confirmado) {
      onDelete(serie.id);
    }
  }

  return (
    <li className="serie-card">
      <div className="serie-card__stub" aria-hidden="true">
        <span>{serie.temporadas}</span>
        <small>{serie.temporadas === 1 ? 'temp.' : 'temps.'}</small>
      </div>

      <div className="serie-card__body">
        <div className="serie-card__headline">
          <h3>{serie.titulo}</h3>
          <span className="serie-card__tag">{serie.categoria}</span>
        </div>
        <dl className="serie-card__meta">
          <div>
            <dt>Diretor</dt>
            <dd>{serie.diretor}</dd>
          </div>
          <div>
            <dt>Produtora</dt>
            <dd>{serie.produtora}</dd>
          </div>
          <div>
            <dt>Lançamento</dt>
            <dd>{formatDate(serie.dataLancamento)}</dd>
          </div>
          <div>
            <dt>Assistida em</dt>
            <dd>{formatDate(serie.dataAssistiu)}</dd>
          </div>
        </dl>
      </div>

      <div className="serie-card__actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => navigate(`/editar/${serie.id}`)}
        >
          Editar
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </li>
  );
}

export default SerieCard;
