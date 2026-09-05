import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import ListPage from './pages/ListPage/ListPage';
import './App.css';

const initialSeries = [
  {
    id: 1,
    titulo: 'La Casa de Papel',
    temporadas: 3,
    dataLancamento: '2020-05-20',
    diretor: 'Álex Pina',
    produtora: 'Netflix',
    categoria: 'Drama',
    dataAssistiu: '2021-05-10',
  },
  {
    id: 2,
    titulo: 'Breaking Bad',
    temporadas: 5,
    dataLancamento: '2008-01-22',
    diretor: 'Vince Gilligan',
    produtora: 'Sony Pictures',
    categoria: 'Drama',
    dataAssistiu: '2015-01-20',
  },
  {
    id: 3,
    titulo: 'Friends',
    temporadas: 10,
    dataLancamento: '1994-09-22',
    diretor: 'Kevin S. Bright',
    produtora: 'Warner Bros',
    categoria: 'Comédia',
    dataAssistiu: '2010-10-10',
  },
];

function App() {
  const [series, setSeries] = useState(initialSeries);
  const [nextId, setNextId] = useState(initialSeries.length + 1);

  function addSerie(novaSerie) {
    setSeries((current) => [...current, { ...novaSerie, id: nextId }]);
    setNextId((id) => id + 1);
  }

  function updateSerie(id, dadosAtualizados) {
    setSeries((current) =>
      current.map((serie) => (serie.id === id ? { ...dadosAtualizados, id } : serie))
    );
  }

  function deleteSerie(id) {
    setSeries((current) => current.filter((serie) => serie.id !== id));
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home totalSeries={series.length} />} />
        <Route path="/sobre" element={<About />} />
        <Route
          path="/cadastrar"
          element={<Register onSave={addSerie} mode="create" />}
        />
        <Route
          path="/editar/:id"
          element={<Register series={series} onSave={updateSerie} mode="edit" />}
        />
        <Route
          path="/series"
          element={<ListPage series={series} onDelete={deleteSerie} />}
        />
      </Routes>
    </>
  );
}

export default App;
