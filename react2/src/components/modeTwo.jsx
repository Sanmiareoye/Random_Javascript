import { useState } from "react";

function ModeTwo() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    setResults([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  const handleSelectedImage = (imageUrl) => {
    setSelectedImage(selectedImage === imageUrl ? null : imageUrl);
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
      <h1> Upload file</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input type="file" onChange={handleFileInputChange} />
        </div>
        <div>
          {file && <img className="nail_img" src={URL.createObjectURL(file)} />}
        </div>

        <button>Upload</button>
      </form>
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
  );
}

export default ModeTwo;
