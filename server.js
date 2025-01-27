const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000; // Используем стандартный порт

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Основной маршрут
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Обработка событий Socket.IO
io.on("connection", (socket) => {
  console.log("Пользователь подключился");

  socket.on("send mess", (data) => {
    console.log("Сообщение от клиента:", data);
    io.emit("add mess", data); // Шлём всем подключённым клиентам
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
