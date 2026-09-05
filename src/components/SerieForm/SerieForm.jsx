import { useState } from 'react';
import './SerieForm.css';

const emptyForm = {
  titulo: '',
  temporadas: '',
  dataLancamento: '',
  diretor: '',
  produtora: '',
  categoria: '',
  dataAssistiu: '',
};

const categorias = ['Drama', 'Comédia', 'Ação', 'Suspense', 'Ficção Científica', 'Documentário', 'Animação', 'Outra'];

function validate(values) {
  const errors = {};

  if (!values.titulo.trim()) {
    errors.titulo = 'Informe o título da série.';
  }

  if (!values.temporadas) {
    errors.temporadas = 'Informe o número de temporadas.';
  } else if (Number(values.temporadas) <= 0) {
    errors.temporadas = 'O número de temporadas deve ser maior que zero.';
  }

  if (!values.dataLancamento) {
    errors.dataLancamento = 'Informe a data de lançamento.';
  }

  if (!values.diretor.trim()) {
    errors.diretor = 'Informe o nome do diretor.';
  }

  if (!values.produtora.trim()) {
    errors.produtora = 'Informe a produtora.';
  }

  if (!values.categoria) {
    errors.categoria = 'Selecione uma categoria.';
  }

  if (!values.dataAssistiu) {
    errors.dataAssistiu = 'Informe a data em que assistiu.';
  } else if (values.dataLancamento && values.dataAssistiu < values.dataLancamento) {
    errors.dataAssistiu = 'A data assistida não pode ser anterior ao lançamento.';
  }

  return errors;
}

function SerieForm({ initialData, onSubmit, submitLabel = 'Cadastrar série', onCancel }) {
  const [values, setValues] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [feedback, setFeedback] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      titulo: true,
      temporadas: true,
      dataLancamento: true,
      diretor: true,
      produtora: true,
      categoria: true,
      dataAssistiu: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFeedback({ type: 'error', message: 'Revise os campos destacados antes de continuar.' });
      return;
    }

    onSubmit({ ...values, temporadas: Number(values.temporadas) });
    setFeedback({ type: 'success', message: 'Série salva com sucesso!' });

    if (!initialData) {
      setValues(emptyForm);
      setTouched({});
    }
  }

  function fieldError(name) {
    return touched[name] && errors[name];
  }

  return (
    <form className="serie-form" onSubmit={handleSubmit} noValidate>
      <div className="serie-form__grid">
        <label className="serie-form__field serie-form__field--full">
          <span>Título</span>
          <input
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Breaking Bad"
            aria-invalid={Boolean(fieldError('titulo'))}
          />
          {fieldError('titulo') && <small className="serie-form__error">{errors.titulo}</small>}
        </label>

        <label className="serie-form__field">
          <span>Número de temporadas</span>
          <input
            type="number"
            name="temporadas"
            min="1"
            value={values.temporadas}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: 5"
            aria-invalid={Boolean(fieldError('temporadas'))}
          />
          {fieldError('temporadas') && (
            <small className="serie-form__error">{errors.temporadas}</small>
          )}
        </label>

        <label className="serie-form__field">
          <span>Data de lançamento da temporada</span>
          <input
            type="date"
            name="dataLancamento"
            value={values.dataLancamento}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError('dataLancamento'))}
          />
          {fieldError('dataLancamento') && (
            <small className="serie-form__error">{errors.dataLancamento}</small>
          )}
        </label>

        <label className="serie-form__field">
          <span>Diretor</span>
          <input
            type="text"
            name="diretor"
            value={values.diretor}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Vince Gilligan"
            aria-invalid={Boolean(fieldError('diretor'))}
          />
          {fieldError('diretor') && <small className="serie-form__error">{errors.diretor}</small>}
        </label>

        <label className="serie-form__field">
          <span>Produtora</span>
          <input
            type="text"
            name="produtora"
            value={values.produtora}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: Sony Pictures"
            aria-invalid={Boolean(fieldError('produtora'))}
          />
          {fieldError('produtora') && (
            <small className="serie-form__error">{errors.produtora}</small>
          )}
        </label>

        <label className="serie-form__field">
          <span>Categoria</span>
          <select
            name="categoria"
            value={values.categoria}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError('categoria'))}
          >
            <option value="">Selecione...</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          {fieldError('categoria') && (
            <small className="serie-form__error">{errors.categoria}</small>
          )}
        </label>

        <label className="serie-form__field">
          <span>Data em que assistiu</span>
          <input
            type="date"
            name="dataAssistiu"
            value={values.dataAssistiu}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError('dataAssistiu'))}
          />
          {fieldError('dataAssistiu') && (
            <small className="serie-form__error">{errors.dataAssistiu}</small>
          )}
        </label>
      </div>

      {feedback && (
        <p
          className={
            feedback.type === 'success'
              ? 'serie-form__feedback serie-form__feedback--success'
              : 'serie-form__feedback serie-form__feedback--error'
          }
          role="status"
        >
          {feedback.message}
        </p>
      )}

      <div className="serie-form__actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default SerieForm;
