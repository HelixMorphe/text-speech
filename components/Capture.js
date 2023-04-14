import { useRef, useState, useEffect } from "react";
import cv from "opencv-ts";
import { BsFillCameraFill } from "react-icons/bs";
export default function Capture() {
  const canvasRef = useRef();
  const [opencvReady, setOpencvReady] = useState(true);
  const [isCaptured, setIsCaptured] = useState(false);
  useEffect(() => {
    // setOpencvReady(true);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        captureAndProcess(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureAndProcess = (imageSrc) => {
    if (!opencvReady) {
      console.error("OpenCV.js is not ready");
      return;
    }
    setIsCaptured(true);

    const imageElement = new Image();
    imageElement.src = imageSrc;

    imageElement.onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(imageElement, 0, 0, 350, 700);
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
  };

  return (
    <div className="">
      <input
        className="border hidden"
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={handleFileChange}
      />
      <div className="flex justify-center p-4">
        <label
          className="text-gray-500 bg-white flex flex-col items-center justify-center gap-1 h-[200px] w-full shadow-lg rounded-lg"
          htmlFor="icon-button-file"
        >
          <BsFillCameraFill size={30} />
          <p className="font-bold">Camera</p>
        </label>
      </div>
      <div
        className={`${
          isCaptured
            ? "h-[100dvh] w-[100dvw] absolute top-0 left-0 bg-white p-4"
            : "hidden"
        }`}
      >
        <div className="grid grid-cols-3">
          <p></p>
          <p className="text-center font-bold text-slate-700 text-xl">
            Contours
          </p>
          <p
            onClick={() => {
              setIsCaptured(false);
            }}
            className="text-end text-red-500"
          >
            Close
          </p>
        </div>
        <div>
          <canvas ref={canvasRef} width="350" height="700" />
        </div>
      </div>
    </div>
  );
}
