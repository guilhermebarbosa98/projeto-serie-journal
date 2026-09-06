import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Home({ totalSeries, loading }) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Grid container spacing={6} alignItems="center" sx={{ minHeight: '55vh' }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            variant="overline"
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.14em',
              color: 'primary.main',
            }}
          >
            Episódio piloto
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.15, mb: 2 }}>
            Seu diário pessoal de{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              séries assistidas
            </Box>
            .
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mb: 4, fontSize: '1.02rem' }}>
            Registre o que você assistiu, quando lançou e quando você chegou ao
            fim da temporada. Sem spoilers, sem enrolação — só o seu histórico,
            organizado como uma estante de fitas.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button component={Link} to="/cadastrar" variant="contained" size="large">
              Cadastrar uma série
            </Button>
            <Button component={Link} to="/series" variant="outlined" size="large">
              Ver minha lista {!loading && `(${totalSeries})`}
            </Button>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: { xs: 170, md: 220 },
              height: { xs: 170, md: 220 },
              borderRadius: '50%',
              border: '6px solid',
              borderColor: 'background.paper',
              bgcolor: 'background.paper',
              boxShadow: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 22,
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: '50%',
              }}
            />
            {loading ? (
              <CircularProgress size={40} />
            ) : (
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, color: 'primary.main' }}
              >
                {String(totalSeries).padStart(2, '0')}
              </Typography>
            )}
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              séries no diário
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
