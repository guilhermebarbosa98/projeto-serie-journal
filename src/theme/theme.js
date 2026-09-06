import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e8a33d',
      contrastText: '#1a1305',
    },
    secondary: {
      main: '#5ec9b8',
    },
    error: {
      main: '#e2695f',
    },
    background: {
      default: '#12141c',
      paper: '#1b1e29',
    },
    text: {
      primary: '#ededf2',
      secondary: '#8a8d9f',
    },
    divider: '#2f3341',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h3: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h4: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#12141c',
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(232, 163, 61, 0.07), transparent 45%), radial-gradient(circle at 85% 20%, rgba(94, 201, 184, 0.06), transparent 40%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        code: {
          fontFamily: "'IBM Plex Mono', monospace",
          backgroundColor: '#232735',
          padding: '1px 6px',
          borderRadius: 4,
          fontSize: '0.85em',
          color: '#f2b75c',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1b1e29',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#2f3341',
        },
      },
    },
  },
});

export default theme;
