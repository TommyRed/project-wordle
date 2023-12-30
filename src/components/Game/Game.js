import React, { useRef, useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const initial = ["", "", "", "", ""];

function Game() {
  const inputRef = useRef(null);
  const [guesses, setGuesses] = useState(initial);
  const [val, setVal] = useState("");

  const resolveColor = (a, b) => {
    if (a === b) {
      return "#0f0";
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {guesses.map((it, idx) => (
          <div style={{ display: "flex", gap: "8px" }} key={idx}>
            {answer.split("").map((b, index) => (
              <div
                style={{
                  border: "solid 1px black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  fontSize: "24px",
                  borderRadius: "4px",
                  backgroundColor: resolveColor(it[index], b),
                }}
                key={index}
              >
                {it[index]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <input
          ref={inputRef}
          style={{
            width: "282px",
            padding: "8px 16px",
            fontSize: "32px",
            letterSpacing: "24px",
            border: "solid 1px black",
            borderRadius: "4px",
            textTransform: "uppercase",
          }}
          max={5}
          value={val}
          onChange={(e) => {
            const newVal = e.target.value;

            if (newVal.length < 5) {
              setVal(newVal);
            }

            if (newVal.length === 5) {
              setVal("");
              const index = guesses.findIndex((val) => val.length === 0);
              const newGuesses = [...guesses];

              newGuesses[index] = newVal.toLocaleUpperCase();

              setGuesses(newGuesses);
            }
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setGuesses(initial);
            setVal("");
            inputRef.current?.focus();
          }}
        >
          reset
        </button>
      </div>
    </>
  );
}

export default Game;
