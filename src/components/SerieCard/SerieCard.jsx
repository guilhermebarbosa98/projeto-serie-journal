import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function SerieCard({ serie, onDelete }) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirmDelete() {
    setDeleting(true);
    try {
      await onDelete(serie.id);
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
          {serie.title}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {serie.seasons}
        </TableCell>
        <TableCell>
          <Chip
            label={serie.category}
            size="small"
            sx={{ bgcolor: 'rgba(94, 201, 184, 0.12)', color: 'secondary.main' }}
          />
        </TableCell>
        <TableCell>{serie.director}</TableCell>
        <TableCell>{serie.production}</TableCell>
        <TableCell sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem' }}>
          {formatDate(serie.releaseDate)}
        </TableCell>
        <TableCell sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem' }}>
          {formatDate(serie.watchedAt)}
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <IconButton
              size="small"
              aria-label={`Editar ${serie.title}`}
              onClick={() => navigate(`/editar/${serie.id}`)}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              aria-label={`Excluir ${serie.title}`}
              onClick={() => setDialogOpen(true)}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Excluir série</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir <strong>{serie.title}</strong> da sua
            lista? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SerieCard;
