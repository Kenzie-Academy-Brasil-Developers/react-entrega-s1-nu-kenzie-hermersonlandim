import "./style.css";
import logo from "../../assets/NuKenzie2.svg";
import lixeira from "../../assets/lixeira.svg";
import { useState } from "react";

const HomePage = ({ setRendle }) => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(cards);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const rendleLandingPage = () => {
    setRendle(false);
  };

  const rendleSubmit = (event) => {
    event.preventDefault();
    setCards((previousCard) => {
      return [...previousCard, { description, value, typeValue }];
    });
    setDescription("");
    setValue("");
    setTypeValue("");
  };

  const handleInput = () => {
    const cardsFiltereds = cards.filter((elem) => elem.typeValue === "Entrada");
    console.log(cardsFiltereds);
  };

  return (
    <>
      <header>
        <div className="container-home">
          <figure>
            <img src={logo} alt="Logo Nu Kenzie" />
          </figure>
          <button className="btn-secundary" onClick={rendleLandingPage}>
            Sair
          </button>
        </div>
      </header>

      <main>
        <div className="container-home mediaQuery">
          <div>
            <form onSubmit={rendleSubmit}>
              <div className="setDescription">
                <label htmlFor="description">Descrição:</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Digite aqui sua descrição"
                  className="inptut-global"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
                <span>Ex: Compra de roupas</span>
              </div>

              <div className="setValues">
                <div>
                  <label htmlFor="value">Valor:</label>
                  <input
                    type="number"
                    id="value"
                    placeholder="R$"
                    className="inptut-global"
                    onChange={(event) => setValue(event.target.value)}
                    value={typeValue === "Saída" ? value * -1 : value}
                  />
                </div>

                <div>
                  <label htmlFor="typeValue">Tipo de Valor: </label>
                  <select
                    className="inptut-global"
                    onChange={(event) => setTypeValue(event.target.value)}
                    value={typeValue}
                  >
                    <option value="Selecione o tipo de valor">
                      Tipo de valor
                    </option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                Inserir Valor
              </button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Valor Total:</th>
                  <tr>
                    {cards.reduce(
                      (previous, current) =>
                        current.typeValue === "Saída"
                          ? previous + parseInt(current.value) * -1
                          : previous + parseInt(current.value),
                      0
                    )}
                  </tr>
                </tr>
              </thead>
              <tfoot>
                <tr>O valor se refere ao saldo</tr>
              </tfoot>
            </table>
          </div>
          <section className="finances">
            <div>
              <h3>Resumo Financeiro</h3>
              <button className="btn-primary">Todos</button>
              <button className="btn-secundary" onClick={() => handleInput}>
                Entradas
              </button>
              <button className="btn-secundary">Despesas</button>
            </div>
            <div className="releases">
              {cards.length === 0 ? (
                <h3>Você ainda não possui nenhum lançamento</h3>
              ) : (
                <div className="card-finances">
                  {cards.map((elem, index) => (
                    <div
                      className={elem.typeValue === "Saída" ? "expense" : ""}
                      key={index}
                    >
                      <div>
                        <h3>{elem.description}</h3>
                        <span>
                          {elem.typeValue === "Saída"
                            ? `-${elem.value}`
                            : elem.value}
                        </span>
                        <button>
                          <img src={lixeira} alt="Remover" />
                        </button>
                      </div>
                      <span>{elem.typeValue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
