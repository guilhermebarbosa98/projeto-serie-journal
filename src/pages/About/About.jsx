import './About.css';

function About() {
  return (
    <main className="page">
      <div className="container about">
        <span className="eyebrow">Sobre o projeto</span>
        <h1>Um projeto para não esquecer o que você já assistiu.</h1>
        <p>
          O <strong>SérieJournal</strong> é um projeto de gerenciamento de séries
          assistidas, desenvolvido em React para a disciplina de Desenvolvimento
          de Sistemas Frontend. Aqui você pode cadastrar, visualizar, editar e
          excluir séries que já fazem parte da sua história como espectador.
        </p>
        <p>
          Nesta primeira fase, o projeto trabalha com dados estáticos mantidos em
          memória — ou seja, as informações não são persistidas em um banco de
          dados e são reiniciadas a cada atualização da página. O foco está na
          componentização, na navegação entre páginas e na construção de
          formulários com validação e feedback visual.
        </p>
        <div className="about__grid">
          <div className="about__item">
            <h3>Componentização</h3>
            <p>
              A interface é dividida em componentes independentes e reutilizáveis,
              como <code>NavBar</code>, <code>SerieForm</code>, <code>SerieList</code>{' '}
              e <code>SerieCard</code>.
            </p>
          </div>
          <div className="about__item">
            <h3>Estado e formulários</h3>
            <p>
              O cadastro de séries usa entradas controladas do React, com
              validação de campos obrigatórios e mensagens de erro em tempo real.
            </p>
          </div>
          <div className="about__item">
            <h3>Navegação</h3>
            <p>
              As rotas são gerenciadas com React Router, permitindo navegar entre
              início, cadastro, listagem e edição sem recarregar a página.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
