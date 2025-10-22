import React, { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";

function Globee() {
  const globeEl = useRef();
  const [paths, setPaths] = useState([]);

  // Utility: generate a random lat/lng
  const randomLatLng = () => {
    return [
      (Math.random() - 0.5) * 180, // latitude from -90 to +90
      (Math.random() - 0.5) * 360, // longitude from -180 to +180
    ];
  };

  useEffect(() => {
    // Optionally enable auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  useEffect(() => {
    // On mount: generate some random paths
    const numPaths = 50; // or more
    const newPaths = [];

    for (let i = 0; i < numPaths; i++) {
      const start = randomLatLng();
      const end = randomLatLng();
      newPaths.push({
        name: `Path ${i}`, // for tooltip or on hover
        pnts: [start, end], // path points array
      });
    }

    setPaths(newPaths);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pathsData={paths}
        pathLabel="name"
        pathPoints="pnts"
        pathPointLat={(d) => d[0]}
        pathPointLng={(d) => d[1]}
        pathPointAlt={0.01} // altitude off the globe
        pathColor={() => "orange"}
        pathStroke={0.5}
        pathResolution={2}
        pathDashLength={0.4}
        pathDashGap={0.2}
        pathDashAnimateTime={1000}
        pathTransitionDuration={1000}
        // Optional props:
        backgroundColor="#000000"
        animateIn={true}
      />
    </div>
  );
}

export default Globee;
