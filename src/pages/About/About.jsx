import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const cards = [
  {
    title: 'Componentização',
    description: (
      <>
        A interface é dividida em componentes independentes e reutilizáveis,
        como <code>NavBar</code>, <code>SerieForm</code>, <code>SerieList</code>{' '}
        e <code>SerieCard</code>.
      </>
    ),
  },
  {
    title: 'Consumo de API',
    description: (
      <>
        Os dados são obtidos e persistidos através de requisições HTTP com{' '}
        <code>Axios</code> à API SérieJournal, com estados de carregamento e
        erro tratados na interface.
      </>
    ),
  },
  {
    title: 'Navegação',
    description: (
      <>
        As rotas são gerenciadas com React Router, permitindo navegar entre
        início, cadastro, listagem e edição sem recarregar a página.
      </>
    ),
  },
];

function About() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography
        variant="overline"
        sx={{ fontFamily: "'IBM Plex Mono', monospace", color: 'primary.main' }}
      >
        Sobre o projeto
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, maxWidth: '20ch', mb: 3 }}>
        Um projeto para não esquecer o que você já assistiu.
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: '68ch', mb: 2 }}>
        O <strong>SérieJournal</strong> é um projeto de gerenciamento de séries
        assistidas, desenvolvido em React para a disciplina de Desenvolvimento
        de Sistemas Frontend. Aqui você pode cadastrar, visualizar, editar e
        excluir séries que já fazem parte da sua história como espectador.
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: '68ch', mb: 5 }}>
        Nesta segunda fase, o projeto consome uma API REST real através da
        biblioteca Axios: todas as operações de listagem, busca, criação,
        edição e exclusão refletem diretamente os dados armazenados no
        servidor. A interface foi construída com o Material-UI (MUI).
      </Typography>

      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 4 }}>
            <Paper variant="outlined" sx={{ p: 2.75, height: '100%' }}>
              <Typography variant="h6" sx={{ color: 'secondary.main', mb: 1, fontSize: '1rem' }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
