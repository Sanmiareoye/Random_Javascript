import ReactWebcam from "react-webcam";
import urlToFile from "./urlToFile";
import { handDetection } from "./handDetection";
import { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function LiveMode() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ready, setReady] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const webcam = useRef(null);
  const canvasRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const webcamStyle = {
    width: isMobile ? "100vw" : "640px",
    height: isMobile ? "auto" : "480px",
    maxHeight: isMobile ? "80vh" : "auto",
    margin: "0 auto",
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const init = async () => {
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
      setReady(true);
      const videoElement = webcam.current.video;
      if (videoElement) {
        handDetection(videoElement, canvasRef.current, handLandmarkerRef);
      }
    };

    init();
  }, [capturedImage]);

  const capture = () => {
    const imageSrc = webcam.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleSubmit = async () => {
    const file = await urlToFile(capturedImage);
    console.log(file);
    const formData = new FormData();
    formData.append("file_upload", file);

    try {
      const endpoint = "http://127.0.0.1:8000/uploadfile/";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("file uploaded successfully!");
      } else {
        console.error("Failed to upload file.");
      }
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        console.log("Got results!:");
      } else {
        console.error("Couldn't process image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setResults([]);
  };

  const handleSelectedImage = (imgUrl) => {
    setSelectedImage(imgUrl === selectedImage ? null : imgUrl);
  };

  const flipWebcam = () => {
    setIsFront((prev) => !prev);
    console.log("webcam flipped");
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    },
    modal: {
      position: "relative",
      background: "#fff",
      padding: "0px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div>
      {!capturedImage ? (
        <div
          style={{
            position: "relative",
            width: isMobile ? "100vw" : "640px",
            margin: "20px auto",
          }}
        >
          <ReactWebcam
            ref={webcam}
            mirrored={isFront}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            videoConstraints={{ facingMode: isFront ? "user" : "environment" }}
            style={webcamStyle}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: webcamStyle.width,
              height: webcamStyle.height,
              transform: isFront ? "scaleX(-1)" : "none",
            }}
          />
          {!ready && <div style={{ textAlign: "center" }}>Loading...</div>}
          <button onClick={capture}>Capture photo</button>
          <button onClick={flipWebcam}>flip cam</button>
        </div>
      ) : (
        <div>
          <img
            style={{ height: "auto", maxWidth: "640px" }}
            src={capturedImage}
            alt="Captured"
          />
          <br />
          <button onClick={retake} style={{ marginTop: "1rem" }}>
            🔄 Retake
          </button>
          <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
            Get similar sets!
          </button>
        </div>
      )}
      <div>
        <ul>
          {results &&
            results.map((result, idx) => (
              <img
                className="nail_img"
                style={{ cursor: "pointer" }}
                key={idx}
                src={result.image_url}
                onClick={() => handleSelectedImage(result.image_url)}
              />
            ))}
        </ul>
        {selectedImage && (
          <div
            style={styles.overlay}
            onClick={() => handleSelectedImage(selectedImage)}
          >
            <div style={styles.modal}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
