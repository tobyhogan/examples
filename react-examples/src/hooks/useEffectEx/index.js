//USE EFFECT HOOKS

/* 
- useEffect accepts two arguments(function and dependency),
    the second is optional, though you should usually pass it
    the second parameter is an array which an have prop or state values
- useEffect runs on every render, to get it to not do this and only run on
    the initial render you can pass in anything(e.g. empty brackets, implying
      no dependencies) to the depency argument
*/

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);