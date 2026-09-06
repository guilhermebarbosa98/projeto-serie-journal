import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const emptyForm = {
  title: '',
  seasons: '',
  releaseDate: '',
  director: '',
  production: '',
  category: '',
  watchedAt: '',
};

const categorias = [
  'Drama',
  'Comédia',
  'Ação',
  'Suspense',
  'Ficção Científica',
  'Documentário',
  'Animação',
  'Outra',
];

function validate(values) {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = 'Informe o título da série.';
  }

  if (!values.seasons) {
    errors.seasons = 'Informe o número de temporadas.';
  } else if (Number(values.seasons) <= 0) {
    errors.seasons = 'O número de temporadas deve ser maior que zero.';
  }

  if (!values.releaseDate) {
    errors.releaseDate = 'Informe a data de lançamento.';
  }

  if (!values.director.trim()) {
    errors.director = 'Informe o nome do diretor.';
  }

  if (!values.production.trim()) {
    errors.production = 'Informe a produtora.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  if (!values.watchedAt) {
    errors.watchedAt = 'Informe a data em que assistiu.';
  } else if (values.releaseDate && values.watchedAt < values.releaseDate) {
    errors.watchedAt = 'A data assistida não pode ser anterior ao lançamento.';
  }

  return errors;
}

function toFormValues(serie) {
  if (!serie) return emptyForm;
  return {
    title: serie.title ?? '',
    seasons: serie.seasons ?? '',
    releaseDate: serie.releaseDate ?? '',
    director: serie.director ?? '',
    production: serie.production ?? '',
    category: serie.category ?? '',
    watchedAt: serie.watchedAt ?? '',
  };
}

function SerieForm({ initialData, onSubmit, submitLabel = 'Cadastrar série', onCancel }) {
  const [values, setValues] = useState(() => toFormValues(initialData));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      title: true,
      seasons: true,
      releaseDate: true,
      director: true,
      production: true,
      category: true,
      watchedAt: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFeedback({ type: 'error', message: 'Revise os campos destacados antes de continuar.' });
      return;
    }

    const payload = {
      ...(initialData ? { id: initialData.id } : {}),
      ...values,
      seasons: Number(values.seasons),
    };

    setSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit(payload);
      setFeedback({ type: 'success', message: 'Série salva com sucesso!' });
      if (!initialData) {
        setValues(emptyForm);
        setTouched({});
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        type: 'error',
        message: 'Não foi possível salvar a série. Verifique se a API está em execução e tente novamente.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  function fieldError(name) {
    return touched[name] ? errors[name] : undefined;
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      noValidate
      variant="outlined"
      sx={{ p: { xs: 3, sm: 4 } }}
    >
      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Breaking Bad"
            error={Boolean(fieldError('title'))}
            helperText={fieldError('title')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Número de temporadas"
            name="seasons"
            slotProps={{ htmlInput: { min: 1 } }}
            value={values.seasons}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: 5"
            error={Boolean(fieldError('seasons'))}
            helperText={fieldError('seasons')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Data de lançamento da temporada"
            name="releaseDate"
            slotProps={{ inputLabel: { shrink: true } }}
            value={values.releaseDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(fieldError('releaseDate'))}
            helperText={fieldError('releaseDate')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Diretor"
            name="director"
            value={values.director}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Vince Gilligan"
            error={Boolean(fieldError('director'))}
            helperText={fieldError('director')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Produtora"
            name="production"
            value={values.production}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Sony Pictures"
            error={Boolean(fieldError('production'))}
            helperText={fieldError('production')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Categoria"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(fieldError('category'))}
            helperText={fieldError('category')}
          >
            <MenuItem value="">
              <em>Selecione...</em>
            </MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Data em que assistiu"
            name="watchedAt"
            slotProps={{ inputLabel: { shrink: true } }}
            value={values.watchedAt}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(fieldError('watchedAt'))}
            helperText={fieldError('watchedAt')}
          />
        </Grid>
      </Grid>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mt: 3 }} role="status">
          {feedback.message}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
        {onCancel && (
          <Button variant="outlined" color="inherit" onClick={onCancel} disabled={submitting}>
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {submitting ? 'Salvando...' : submitLabel}
        </Button>
      </Box>
    </Paper>
  );
}

export default SerieForm;
