import { useState } from "react";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [rendle, setRendle] = useState(false);
  return (
    <div className="App">
      {rendle ? (
        <>
          <ToastContainer />
          <HomePage setRendle={setRendle} />
        </>
      ) : (
        <LandingPage setRendle={setRendle} />
      )}
    </div>
  );
}

export default App;
