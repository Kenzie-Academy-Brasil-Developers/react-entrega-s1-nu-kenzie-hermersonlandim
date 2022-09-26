import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";

function App() {
  const [rendle, setRendle] = useState(false);
  return (
    <div className="App">
      {rendle ? (
        <HomePage setRendle={setRendle} />
      ) : (
        <LandingPage setRendle={setRendle} />
      )}
    </div>
  );
}

export default App;
