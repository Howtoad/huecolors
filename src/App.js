import "./App.css";
import React, { useState, useEffect } from "react";
import InputColor from "react-input-color";

function App() {
  const [isOn, setIsOn] = useState(false);
  const [color, setColor] = useState({ hex: "#ffffff" });
  const url =
    "http://192.168.8.100/api/R0J6FbLFVRViiQEwDxTTmUMrErKHZoBSWUWB1Y3N/lights/32/state";

  useEffect(() => {
    // update the color of the lamp when the value of color changes
    const LightSwitch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        on: isOn,
        hue: Math.round(parseInt(color.hex.slice(1), 16)) % 65535,
      }),
    };
    fetch(url, LightSwitch)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [isOn, color]); // only run this effect when the value of color changes

  const OnOff = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="App">
      <button onClick={OnOff}>{isOn ? "Turn Off" : "Turn On"}</button>
      <div>
        <InputColor
          initialValue={"#ffffff" || color.hex}
          onChange={(color) => {
            console.log(
              "new color is: ",
              Math.round(parseInt(color.hex.slice(1), 16)) % 65535
            );
            setColor(color);
          }}
          placement="right"
        />
        <div
          style={{
            width: 50,
            height: 50,
            marginTop: 20,
            backgroundColor: color.rgba,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
