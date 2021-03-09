import React from 'react';
import RepositoryItem from './RepositoryItem';
import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${empresa}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, empresa); 

  const [empresa, setEmpresa] = React.useState('github');

  function definirEmpresa() {
    setEmpresa(document.getElementById('empresa').value);
    console.log(empresa);
  }

  return (
    <section className="repository-list">
      <h1>Lista de repositorios</h1>
      <input type="text" id="empresa" />
      <button type="button" onClick={definirEmpresa}>
        PESQUISAR
      </button>
      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
