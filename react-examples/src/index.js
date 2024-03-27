//USE EFFECT HOOKS

/* 
- useEffect accepts two arguments(function and dependency),
    the second is optional, though you should usually pass it
    the second parameter is an array which an have prop or state values

- useEffect runs on every render, to get it to not do this and only run on
    the initial render you can pass in anything(e.g. empty brackets, implying
    no dependencies) to the depency argument. When real dependencies are passed
    in, then it will run on the first render, and when any dependencies are
    updated


*/

// BASIC EXAMPLE

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}


// EFFECT CLEANUP


function Timer2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);

  return () => clearTimeout(timer)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}


// CALCULATION


function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);