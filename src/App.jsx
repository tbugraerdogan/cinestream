import { useState } from "react";
import "./App.css";
import Login from "./pages/login/login";
import Movies from "./pages/Movies/Movies";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Movies />
    </>
  );
}

export default App;
