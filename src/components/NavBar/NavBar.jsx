import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/cadastrar', label: 'Cadastrar série' },
  { to: '/series', label: 'Minhas séries' },
];

function NavItem({ to, end, children }) {
  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end });

  return (
    <Button
      component={Link}
      to={to}
      aria-current={isActive ? 'page' : undefined}
      sx={{
        fontSize: '0.88rem',
        color: isActive ? 'primary.main' : 'text.secondary',
        bgcolor: isActive ? 'rgba(232, 163, 61, 0.1)' : 'transparent',
        '&:hover': {
          bgcolor: isActive ? 'rgba(232, 163, 61, 0.16)' : 'action.hover',
        },
      }}
    >
      {children}
    </Button>
  );
}

function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          pt: 0.75,
          px: 1.5,
          bgcolor: 'background.default',
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'divider',
            }}
          />
        ))}
      </Box>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ flexWrap: 'wrap', gap: 1.5, py: 1 }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <PlayArrowRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            SérieJournal
          </Typography>
          <Box
            component="nav"
            aria-label="Navegação principal"
            sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}
          >
            {links.map((link) => (
              <NavItem key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
