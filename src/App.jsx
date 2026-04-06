import { useState } from "react";
import Ecomm from "./Ecomm";
import LandingPage from "./LandingPage";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered ? (
        <LandingPage onEnter={() => setEntered(true)} />
      ) : (
        <Ecomm />
      )}
    </>
  );
}

export default App;