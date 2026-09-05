import { useNavigate, useParams } from 'react-router-dom';
import SerieForm from '../../components/SerieForm/SerieForm';
import '../../App.css';

function Register({ series = [], onSave, mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === 'edit';
  const serieAtual = isEdit ? series.find((serie) => serie.id === Number(id)) : null;

  function handleSubmit(dados) {
    if (isEdit) {
      onSave(Number(id), dados);
    } else {
      onSave(dados);
    }
    navigate('/series');
  }

  if (isEdit && !serieAtual) {
    return (
      <main className="page">
        <div className="container">
          <p>Série não encontrada.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">{isEdit ? 'Editar registro' : 'Novo registro'}</span>
          <h1>{isEdit ? `Editar "${serieAtual.titulo}"` : 'Cadastrar série'}</h1>
          <p>
            Preencha as informações abaixo. Todos os campos são obrigatórios para
            manter o seu diário completo.
          </p>
        </div>

        <SerieForm
          initialData={serieAtual}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/series')}
          submitLabel={isEdit ? 'Salvar alterações' : 'Cadastrar série'}
        />
      </div>
    </main>
  );
}

export default Register;
