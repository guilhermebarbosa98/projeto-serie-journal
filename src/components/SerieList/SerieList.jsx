import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SerieCard from '../SerieCard/SerieCard';

function SerieList({ series, loading, error, onRetry, onDelete }) {
  const [busca, setBusca] = useState('');

  const seriesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return series;
    return series.filter((serie) =>
      [serie.title, serie.director, serie.production, serie.category]
        .join(' ')
        .toLowerCase()
        .includes(termo)
    );
  }, [series, busca]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Tentar novamente
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          size="small"
          placeholder="Buscar por título, diretor, produtora ou categoria..."
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          sx={{ width: { xs: '100%', sm: 380 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: 'nowrap' }}
        >
          {seriesFiltradas.length} de {series.length} série
          {series.length !== 1 && 's'}
        </Typography>
      </Stack>

      {seriesFiltradas.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            borderStyle: 'dashed',
          }}
        >
          {series.length === 0 ? (
            <>
              <Typography color="text.secondary">
                Você ainda não cadastrou nenhuma série.
              </Typography>
              <Button component={Link} to="/cadastrar" variant="contained">
                Cadastrar primeira série
              </Button>
            </>
          ) : (
            <Typography color="text.secondary">
              Nenhuma série encontrada para &quot;{busca}&quot;.
            </Typography>
          )}
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="center">Temporadas</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Diretor</TableCell>
                <TableCell>Produtora</TableCell>
                <TableCell>Lançamento</TableCell>
                <TableCell>Assistida em</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seriesFiltradas.map((serie) => (
                <SerieCard key={serie.id} serie={serie} onDelete={onDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {series.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={Link} to="/cadastrar" variant="outlined">
            Cadastrar nova série
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SerieList;
