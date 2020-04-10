import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [project, setProject] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setProject(response.data);
    })
  }, []);
  
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()} `,
      url: "https://github.com/lcmiranda",
	    techs: "Desafio de NodeJS o melhor"
    });
    const projects = response.data;
    setProject([...project, projects]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    try{
      await api.delete(`/repositories/${id}`);
      setProject(project.filter(projects => projects.id !== id));
    }catch(err){
      alert('Erro ao Deletar caso, tente novamente')
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {project.map(project => 
          <li key={project.id} >
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>  
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
