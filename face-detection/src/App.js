import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const img = imgRef.current;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const desiredAspectRatio = 1;
    let newWidth, newHeight;
    if (naturalWidth > naturalHeight) {
      newWidth = Math.min(naturalWidth, window.innerWidth);
      newHeight = newWidth / desiredAspectRatio;
    } else {
      newHeight = Math.min(naturalHeight, window.innerHeight * 0.8);
      newWidth = newHeight * desiredAspectRatio;
    }
  
    const displayCanvas = canvasRef.current;
    displayCanvas.width = newWidth;
    displayCanvas.height = newHeight;
  
    faceapi.matchDimensions(displayCanvas, {
      height: newHeight,
      width: newWidth,
    });
  
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
  
    const resizedDetections = faceapi.resizeResults(detections, {
      height: newHeight,
      width: newWidth,
    });

    faceapi.draw.drawDetections(displayCanvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(displayCanvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(displayCanvas, resizedDetections);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    selectedImage && loadModels();
  }, [selectedImage]);

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <div className="canvas-container">
          <img
            crossOrigin="anonymous"
            ref={imgRef}
            src={selectedImage}
            alt=""
            onLoad={handleImage}
          />
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}

export default App;
