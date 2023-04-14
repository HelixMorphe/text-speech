import { useRef, useState, useEffect } from "react";
import cv from "opencv-ts";
export default function Capture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [opencvReady, setOpencvReady] = useState(false);

  useEffect(() => {
    const loadAndProcessVideo = async () => {
      setOpencvReady(true);
      startVideo();
    };

    loadAndProcessVideo();
  }, []);

  const startVideo = () => {
    if (navigator?.mediaDevices?.getUserMedia) {
      const constraints = {
        video: {
          facingMode: { exact: "environment" }, // Request the back camera
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  };

  const captureAndProcess = () => {
    if (!opencvReady) {
      console.error("OpenCV.js is not ready");
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    const src = cv.imread(canvasRef.current);
    const gray = new cv.Mat();
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.Canny(gray, gray, 50, 150, 3, false);
    cv.findContours(
      gray,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    for (let i = 0; i < contours.size(); ++i) {
      cv.drawContours(
        src,
        contours,
        i,
        new cv.Scalar(0, 255, 0),
        2,
        8,
        hierarchy,
        0
      );
    }

    cv.imshow(canvasRef.current, src);

    src.delete();
    gray.delete();
    contours.delete();
    hierarchy.delete();
  };

  return (
    <div className="border border-red-600">
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        controls={false}
      />
      <button onClick={captureAndProcess}>Capture and Detect Contours</button>
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
}
