import { io } from "socket.io-client";

export default ({ app }, inject) => {
  const socket = io("http://localhost:3000");
  inject("socket", socket);
};
