import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

// import FavoriteColor from './hooks/useStateEx';



function App() {

  /*

  // Below is code that is from the useStateEx.js file, and it's been moved here so it functions correctly
    // when the code is imported from a module any variable will output 'undefined' as the code for this file(App.js) is executed first

  const [color, setColor] = useState("green");

  console.log(color);

  */


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}



export default App;
