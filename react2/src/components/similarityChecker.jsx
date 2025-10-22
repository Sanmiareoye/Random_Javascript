import { useState } from "react";
import ToggleSwitch from "./toggleSwitch";
import ModeTwo from "./modeTwo";
import Webcam from "./webCam";

function SimilarityChecker() {
  const [mode, setMode] = useState(null);

  return (
    <div>
      <ToggleSwitch
        onChange={(newMode) => {
          setMode(newMode);
        }}
      />

      {mode === 1 && <Webcam />}

      {mode === 2 && <ModeTwo />}
    </div>
  );
}

export default SimilarityChecker;
