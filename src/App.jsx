import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import ListPage from './pages/ListPage/ListPage';
import { useSeries } from './hooks/useSeries';

function App() {
  const { series, loading, error, refetch, addSerie, editSerie, removeSerie } =
    useSeries();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={<Home totalSeries={series.length} loading={loading} />}
          />
          <Route path="/sobre" element={<About />} />
          <Route
            path="/cadastrar"
            element={<Register onSave={addSerie} mode="create" />}
          />
          <Route
            path="/editar/:id"
            element={
              <Register
                series={series}
                loading={loading}
                onSave={editSerie}
                mode="edit"
              />
            }
          />
          <Route
            path="/series"
            element={
              <ListPage
                series={series}
                loading={loading}
                error={error}
                onRetry={refetch}
                onDelete={removeSerie}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
