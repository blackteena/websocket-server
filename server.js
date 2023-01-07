const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
  console.log('Новый пользователь');
  // отправка приветственного сообщения клиенту
  wsClient.send('Привет');
  wsClient.on('message', function (message) {
    try {
      const jsonMessage = JSON.parse(message);
      if (jsonMessage.action === 'ECHO') {
        wsClient.send(jsonMessage.data);
        console.log(jsonMessage.data)
      }
      else if (jsonMessage.action === 'PING') {
        setTimeout(function () {
          wsClient.send('PONG');
        }, 2000);
      }
      else {
        console.log('Неизвестная команда');
      }
    } catch (error) {
      console.log('Ошибка', error);
    }
  })
  // отправка уведомления в консоль
  wsClient.on('close', function () {
    console.log('Пользователь отключился');
  })
}
