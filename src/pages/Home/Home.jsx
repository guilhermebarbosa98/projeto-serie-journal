import { Link } from 'react-router-dom';
import './Home.css';

function Home({ totalSeries }) {
  return (
    <main className="page">
      <div className="container home">
        <div className="home__content">
          <span className="eyebrow">Episódio piloto</span>
          <h1>
            Seu diário pessoal de <em>séries assistidas</em>.
          </h1>
          <p>
            Registre o que você assistiu, quando lançou e quando você chegou ao
            fim da temporada. Sem spoilers, sem enrolação — só o seu histórico,
            organizado como uma estante de fitas.
          </p>
          <div className="home__cta">
            <Link to="/cadastrar" className="btn btn-primary">
              Cadastrar uma série
            </Link>
            <Link to="/series" className="btn btn-ghost">
              Ver minha lista ({totalSeries})
            </Link>
          </div>
        </div>

        <div className="home__reel" aria-hidden="true">
          <div className="home__reel-frame">
            <span>{String(totalSeries).padStart(2, '0')}</span>
            <small>séries no diário</small>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
