import { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const HandTracker1 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Initialize hand landmarker
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 2,
        }
      );

      // Start webcam
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Wait for video to be ready
      await new Promise((resolve) => {
        videoRef.current.onloadeddata = resolve;
      });

      setReady(true);
      startDetection();
    };

    const startDetection = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const detect = () => {
        if (!video || !canvas || !handLandmarkerRef.current) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (video.videoWidth > 0 && video.videoHeight > 0) {
          const results = handLandmarkerRef.current.detectForVideo(
            video,
            performance.now()
          );

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (results.landmarks) {
            for (const landmarks of results.landmarks) {
              // Draw connections
              const connections = [
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 4],
                [0, 5],
                [5, 6],
                [6, 7],
                [7, 8],
                [0, 9],
                [9, 10],
                [10, 11],
                [11, 12],
                [0, 13],
                [13, 14],
                [14, 15],
                [15, 16],
                [0, 17],
                [17, 18],
                [18, 19],
                [19, 20],
                [5, 9],
                [9, 13],
                [13, 17],
              ];

              ctx.strokeStyle = "#00FF00";
              ctx.lineWidth = 2;
              for (const [start, end] of connections) {
                ctx.beginPath();
                ctx.moveTo(
                  landmarks[start].x * canvas.width,
                  landmarks[start].y * canvas.height
                );
                ctx.lineTo(
                  landmarks[end].x * canvas.width,
                  landmarks[end].y * canvas.height
                );
                ctx.stroke();
              }

              // Draw points
              ctx.fillStyle = "#FF0000";
              for (const landmark of landmarks) {
                ctx.beginPath();
                ctx.arc(
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  3,
                  0,
                  2 * Math.PI
                );
                ctx.fill();
              }
            }
          }
        }
        requestAnimationFrame(detect);
      };

      detect();
    };

    init();
  }, []);

  return (
    <div style={{ position: "relative", width: "640px", margin: "20px auto" }}>
      <video
        ref={videoRef}
        autoPlay
        
        playsInline
        style={{ width: "100%", transform: "scaleX(-1)" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: "scaleX(-1)",
        }}
      />
      {!ready && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>Loading...</div>
      )}
    </div>
  );
};

export default HandTracker1;
