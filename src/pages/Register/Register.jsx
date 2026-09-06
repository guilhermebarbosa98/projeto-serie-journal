import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SerieForm from '../../components/SerieForm/SerieForm';

function Register({ series = [], loading = false, onSave, mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === 'edit';
  const serieAtual = isEdit ? series.find((serie) => serie.id === Number(id)) : null;

  async function handleSubmit(payload) {
    await onSave(payload);
    navigate('/series');
  }

  if (isEdit && loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isEdit && !serieAtual) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning">Série não encontrada.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="overline"
          sx={{ fontFamily: "'IBM Plex Mono', monospace", color: 'primary.main' }}
        >
          {isEdit ? 'Editar registro' : 'Novo registro'}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          {isEdit ? `Editar "${serieAtual.title}"` : 'Cadastrar série'}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: '60ch' }}>
          Preencha as informações abaixo. Todos os campos são obrigatórios para
          manter o seu diário completo.
        </Typography>
      </Box>

      <SerieForm
        initialData={serieAtual}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/series')}
        submitLabel={isEdit ? 'Salvar alterações' : 'Cadastrar série'}
      />
    </Container>
  );
}

export default Register;
