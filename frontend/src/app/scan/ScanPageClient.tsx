"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, CameraDevice } from "html5-qrcode";
import { RotateCcw } from "lucide-react";

export default function ScanPageClient() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStartedRef = useRef(false);
  const latestSendMode = useRef<"manual" | "auto">("manual");

  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [sendMode, setSendMode] = useState<"manual" | "auto">("manual");

  useEffect(() => {
    latestSendMode.current = sendMode;
  }, [sendMode]);

  useEffect(() => {
    let mounted = true;

    const handleScan = (decodedText: string) => {
      setScannedCode(decodedText);
      if (latestSendMode.current === "auto") sendToHost(decodedText);
    };

    const startScanner = async (cameraId: string) => {
      if (isStartedRef.current && scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        isStartedRef.current = false;
      }

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }

      try {
        await scannerRef.current.start(
          { deviceId: { exact: cameraId } },
          {
            fps: 10,
            qrbox: 250,
            aspectRatio: window.innerWidth / window.innerHeight,
            videoConstraints: {
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              facingMode: "environment",
            },
          },
          handleScan,
          (err) => console.warn("Scan error:", err)
        );
        isStartedRef.current = true;
      } catch (err) {
        console.error("Scanner start error", err);
      }
    };

    const loadCamerasAndStart = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (!mounted) return;

        if (devices.length) {
          setCameras(devices);
          const backCamera = devices.find((device) =>
            /back|rear|environment/gi.test(device.label)
          );
          const startingCamera = backCamera || devices[0];
          setCurrentCameraId(startingCamera.id);
          await startScanner(startingCamera.id);
        }
      } catch (err) {
        console.error("Error getting cameras", err);
      }
    };

    loadCamerasAndStart();

    return () => {
      mounted = false;
      if (scannerRef.current && isStartedRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current?.clear())
          .catch(console.error);
      }
    };
  }, []);

  const switchCamera = async () => {
    if (!cameras.length) return;

    const currentIndex = cameras.findIndex((cam) => cam.id === currentCameraId);
    const nextIndex = (currentIndex + 1) % cameras.length;
    const nextCameraId = cameras[nextIndex].id;
    setCurrentCameraId(nextCameraId);

    if (scannerRef.current && isStartedRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      isStartedRef.current = false;
    }

    if (scannerRef.current) {
      await scannerRef.current.start(
        { deviceId: { exact: nextCameraId } },
        {
          fps: 10,
          qrbox: 250,
          aspectRatio: window.innerWidth / window.innerHeight,
          videoConstraints: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "environment",
          },
        },
        (decodedText) => {
          setScannedCode(decodedText);
          if (latestSendMode.current === "auto") sendToHost(decodedText);
        },
        (err) => console.warn("Scan error:", err)
      );
      isStartedRef.current = true;
    }
  };

  const sendToHost = (code: string) => {
    alert(`Barcode "${code}" sent to host!`);
    setScannedCode(null);
  };

  const toggleSendMode = () => {
    setSendMode((prev) => (prev === "manual" ? "auto" : "manual"));
  };

  return (
    <>
      <style>{`
        #reader {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: black;
          z-index: 0;
        }
        #reader video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }
      `}</style>

      <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
        <div id="reader" />

        {/* Center scan box */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: 250,
            height: 250,
            borderRadius: 12,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Toggle Mode */}
        <button
          onClick={toggleSendMode}
          className="absolute top-4 right-4 z-20 px-4 py-2 bg-white text-black rounded-md shadow-lg font-bold"
        >
          Mode: {sendMode === "manual" ? "Manual" : "Auto"}
        </button>

        {/* Scanned Preview */}
        {scannedCode && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-lg z-20 max-w-[80%] text-center">
            Scanned: {scannedCode}
          </div>
        )}

        {/* Camera Switch */}
        {cameras.length > 1 && (
          <button
            onClick={switchCamera}
            className="absolute bottom-6 right-6 z-20 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            title="Switch Camera"
            aria-label="Switch Camera"
          >
            <RotateCcw size={24} />
          </button>
        )}

        {/* Manual Send */}
        {sendMode === "manual" && (
          <button
            onClick={() => scannedCode && sendToHost(scannedCode)}
            disabled={!scannedCode}
            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white font-semibold rounded-full z-20 transition 
              ${scannedCode ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}
          >
            OK
          </button>
        )}
      </div>
    </>
  );
}
