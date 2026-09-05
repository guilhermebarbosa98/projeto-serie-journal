import SerieList from '../../components/SerieList/SerieList';
import '../../App.css';

function ListPage({ series, onDelete }) {
  return (
    <main className="page">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Estante</span>
          <h1>Lista de séries</h1>
          <p>Todas as séries que você já registrou, com edição e exclusão rápidas.</p>
        </div>

        <SerieList series={series} onDelete={onDelete} />
      </div>
    </main>
  );
}

export default ListPage;
