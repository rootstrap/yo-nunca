import { useState, useMemo } from "react";

import CardFlip from "./components/CardFlip/index.tsx";
import { initialData } from "./data";
import "./App.css";

function App() {
  const initialDataShuffled = useMemo(
    () =>
      initialData
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    []
  );

  const [data, setData] = useState(initialDataShuffled);

  const handleOnClick = (e, { index }) => {
    e.preventDefault();
    const newData = [...data];
    const selected = data[index];
    const newValue = {
      ...selected,
      isFlipped: !selected.isFlipped,
    };
    newData[index] = newValue;
    setData(newData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YO NUNCA</h1>
        <div className="Container">
          {data.map(({ text, player, country, image, isFlipped }, index) => (
            <CardFlip isFlipped={isFlipped} key={index}>
              <img
                className="Card"
                onClick={(e) => handleOnClick(e, { index })}
                src={image}
                alt={`${player}-${country}`}
              ></img>

              <p
                className="Card Text"
                onClick={(e) =>
                  handleOnClick(e, { index, text, player, country, image })
                }
              >
                {text}
              </p>
            </CardFlip>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
