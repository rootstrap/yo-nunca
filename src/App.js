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
    [initialData]
  );

  const [data, setData] = useState(initialDataShuffled);

  const handleOnClick = (e, { index, text, player, country, image }) => {
    e.preventDefault();
    setData((prevState) => {
      const newData = [...prevState];
      const selectedValue = prevState[index];
      const newValue = {
        ...selectedValue,
        isFlipped: !selectedValue.isFlipped,
      };
      newData[index] = newValue;
      return newData;
    });
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
                onClick={(e) =>
                  handleOnClick(e, { index, text, player, country, image })
                }
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
