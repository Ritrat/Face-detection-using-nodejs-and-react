import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './Detection.css';

function GenderDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const imgRef = useRef();
  const canvasRef = useRef();
  const fileInputRef = useRef();

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
      .withAgeAndGender();

    const resizedDetections = faceapi.resizeResults(detections, {
      height: newHeight,
      width: newWidth,
    });

    resizedDetections.forEach((det) => {
        const { x, y, width, height } = det.detection.box;
        const genderLabel = det.gender === 'male' ? 'Male' : 'Female';
        const box = new faceapi.draw.DrawBox(
          { x, y, width, height },
          { label: genderLabel, lineWidth: 2 }
        );
        box.draw(displayCanvas);
      });
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    };
  
    useEffect(() => {
      const loadModels = async () => {
        try {
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.ageGenderNet.loadFromUri('/models'),
          ]);
          handleImage();
        } catch (e) {
          console.log(e);
        }
      };
  
      selectedImage && loadModels();
    }, [selectedImage]);
  
    return (
      <div className="container">
        <h2>GENDER DETECTION</h2>
        <div className="canvas-container">
          {selectedImage && (
            <>
              <img
                crossOrigin="anonymous"
                ref={imgRef}
                src={selectedImage}
                alt=""
                onLoad={handleImage}
              />
              <canvas ref={canvasRef} />
            </>
          )}
        </div>
        <button className="file-button" onClick={() => fileInputRef.current.click()}>
          SELECT
        </button>
        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
      </div>
    );
  }
  
  export default GenderDetection;
