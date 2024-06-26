const ws = require("ws");

//Создание веб-сокет сервера

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => {
    console.log(`Server started on port 5000!`);
  }
);

//Подписываемся на событие подключение
wss.on("connection", function connection(ws) {
  ws.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
