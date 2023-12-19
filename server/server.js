const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');

const app = express();
const port = 5000;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const detections = await faceapi
      .detectAllFaces(req.file.buffer, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    res.json({ success: true, detections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:$3000');
});