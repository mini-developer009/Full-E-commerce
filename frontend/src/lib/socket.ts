import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (userId: string) => {
  socket = io();
  socket.emit("register-user", userId);
};

export const emitBarcode = (userId: string, barcode: string) => {
  socket.emit("barcode-scanned", { userId, barcode });
};

export const onBarcodeReceived = (callback: (barcode: string) => void) => {
  socket.on("barcode-scanned", (data) => callback(data.barcode));
};
