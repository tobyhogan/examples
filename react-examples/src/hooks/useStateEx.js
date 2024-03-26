import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("");


  setColor("green");

  console.log(color);


}

export default FavoriteColor;