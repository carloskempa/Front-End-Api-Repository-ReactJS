import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repositorie = {
      title: `Repositorie ${Date.now()}`,
      url: "url_projeto_vcalies_TESTE",
      techs: ["Node.js", "ReactJS"],
      likes: 0,
    };
    await api
      .post("/repositories", repositorie)
      .then((response) => {
        setRepository([...repository, response.data]);
      })
      .catch((erro) => {
        console.error(erro);
        alert(erro);
      });
  }

  async function handleRemoveRepository(id) {
    await api
      .delete(`/repositories/${id}`)
      .then((response) => {
        setRepository(repository.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((item) => {
          return (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
