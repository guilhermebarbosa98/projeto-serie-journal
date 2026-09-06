import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SerieList from '../../components/SerieList/SerieList';

function ListPage({ series, loading, error, onRetry, onDelete }) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ fontFamily: "'IBM Plex Mono', monospace", color: 'primary.main' }}
        >
          Estante
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          Lista de séries
        </Typography>
        <Typography color="text.secondary">
          Todas as séries que você já registrou, com edição e exclusão rápidas.
        </Typography>
      </Box>

      <SerieList
        series={series}
        loading={loading}
        error={error}
        onRetry={onRetry}
        onDelete={onDelete}
      />
    </Container>
  );
}

export default ListPage;
