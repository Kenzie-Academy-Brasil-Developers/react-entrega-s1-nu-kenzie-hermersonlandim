import "./style.css";
import logo from "../../assets/NuKenzie2.svg";
import lixeira from "../../assets/lixeira.svg";
import { useState } from "react";
import { toast } from "react-toastify";

const HomePage = ({ setRendle }) => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const rendleLandingPage = () => {
    setRendle(false);
  };

  const rendleSubmit = (event) => {
    event.preventDefault();

    setSelected((previousSelect) => {
      return [...previousSelect, { description, value, typeValue }];
    });
    setCards((previousCard) => {
      return [...previousCard, { description, value, typeValue }];
    });
    setDescription("");
    setValue("");
    notify(
      `Adicionado ${typeValue} de R$${parseInt(value)
        .toFixed(2)
        .replace(".", ",")} com sucesso!`
    );
  };

  const handleInput = (value) => {
    const cardsFiltereds = cards.filter(
      (elem) => elem.typeValue === value || value === "Todos"
    );
    setSelected(cardsFiltereds);
  };

  const remove = (id) => {
    const cardsFiltereds = cards.filter((elem, index) => id !== index);
    setCards(cardsFiltereds);
    setSelected(cardsFiltereds);
    error("Removido com Sucesso!");
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const error = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
                <label htmlFor="description">Descri????o:</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Digite aqui sua descri????o"
                  className="inptut-global"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                  required="true"
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
                    value={typeValue === "Sa??da" ? value * -1 : value}
                    required="true"
                  />
                </div>

                <div>
                  <label htmlFor="typeValue">Tipo de Valor: </label>
                  <select
                    className="inptut-global"
                    onChange={(event) => setTypeValue(event.target.value)}
                    defaultValue={typeValue}
                    required="true"
                  >
                    <option value="">Selecione um Tipo</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Sa??da">Sa??da</option>
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
                    R$
                    {selected
                      .reduce(
                        (previous, current) =>
                          current.typeValue === "Sa??da"
                            ? previous + parseInt(current.value) * -1
                            : previous + parseInt(current.value),
                        0
                      )
                      .toFixed(2)}
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
              <button
                className="btn-primary"
                value="Todos"
                onClick={(event) => handleInput(event.target.value)}
              >
                Todos
              </button>
              <button
                className="btn-secundary"
                value="Entrada"
                onClick={(event) => handleInput(event.target.value)}
              >
                Entradas
              </button>
              <button
                className="btn-secundary"
                value="Sa??da"
                onClick={(event) => handleInput(event.target.value)}
              >
                Despesas
              </button>
            </div>
            <div className="releases">
              {selected.length === 0 ? (
                <h3>Voc?? ainda n??o possui nenhum lan??amento</h3>
              ) : (
                <div className="card-finances">
                  {selected.map((elem, index) => (
                    <div
                      className={elem.typeValue === "Sa??da" ? "expense" : ""}
                      key={index}
                    >
                      <div>
                        <h3>{elem.description}</h3>
                        <span>
                          R$
                          {elem.typeValue === "Sa??da"
                            ? parseInt(elem.value * -1).toFixed(2)
                            : parseInt(elem.value).toFixed(2)}
                        </span>
                        <button onClick={() => remove(index)} id={index}>
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
