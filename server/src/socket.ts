import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";

interface customSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((Socket: customSocket, next) => {
    const room = Socket.handshake.auth.room || Socket.handshake.headers.room;

    if (!room) {
      return new Error("Invalid room");
    }

    Socket.room = room;
    next();
  });

  io.on("connection", (socket: customSocket) => {
    // join the room
    socket.join(socket.room);

    socket.on("clientMessage", async (data) => {
      console.log("This is the message recived in server side : ", data);

      await prisma.chats.create({
        data: data,
      });

      io.to(socket.room).emit("serverMessage", data);

      //   socket.emit("serverMessage", " micky mouse ");
      //   socket.broadcast.emit("serverMessage2", " micky mouse2 ");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
}
