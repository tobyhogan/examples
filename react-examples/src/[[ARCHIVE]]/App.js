import { useState } from 'react';

import Timer from './hooks/useEffectEx.js'

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
        <h1>test</h1>

        <Timer></Timer>


      </header>
    </div>
  );
}



export default App;
