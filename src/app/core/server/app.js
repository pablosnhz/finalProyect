const webpush = require('web-push');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const vapiKeys = {
  publicKey: "BCAQRbQDGluHEj_XYfX56exXT0kpYC7SPWPYtlN9wy4Eg5HYvS11kyMW4kdoXNFE4misceKnfjtqEomiGOkTm7c",
  privateKey: "32mWhfT8AqZt-0AaUWfOnwLB-FwazIJAVFPGbWsRiyU"
};

webpush.setVapidDetails(
  'mailto:Kp2rC@example.com',
  vapiKeys.publicKey,
  vapiKeys.privateKey
);

// Helpers
const handlerResponse = (res, data, code = 200) => {
  res.status(code).send(data);
};

// Controladores
const savePush = (req, res) => {
  const name = Math.floor(Date.now() / 1000);
  let tokenBrowser = req.body.token;
  let data = JSON.stringify(tokenBrowser);

  fs.writeFile(`tokens/token-${name}.json`, data, (err) => {
    if (err) {
      handlerResponse(res, 'Error al guardar el token', 500);
    } else {
      handlerResponse(res, 'Token guardado');
    }
  });
};

const sendPush = (req, res) => {

  const pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/cdcJ7CIItDs:APA91bFTZHx97Tdx8Bm2LLuhGek_JgGTdGBH1N6KT_qOlZgO8QlkSUJXjfKL2XcOSda9SX-g07MlwbrobOxiWfYnK-bUBg4vlAn5LA3uWTBHXioEVJ2ju-J3vLvV-FQl-Xe9zIW0YToU",
    keys: {
        auth: "bRYHgs0Ob54sqggdOH1ugA",
        p256dh: "BDkCQSCGcFEfs1MUKYZmRtJ6q903TpdYCXJo38Dq1kW4iNtfjO1UAZWVGIWGxuLpiMGxe2tl30sNWT5NtofJJj4"
    }
};

  const payload = {
    notification: {
      title: "Notificación de prueba",
      body: "Nueva actualización!",
      vibrate: [100, 50, 100],
      image: "https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/8d3a916a-38a5-4d15-87c4-8063a8371507.jpeg",
      actions: [{
        action: "explore",
        title: "Ir a la página"
      }]
    }
  };

  webpush.sendNotification(
    pushSubscription,
    JSON.stringify(payload))
    .then(res => {
        console.log('Enviado !!');
    }).catch(err => {
        console.log('Error', err);
    })

res.send({ data: 'Se envio subscribete!!' })
};

// Rutas
app.route('/saveToken').post(savePush);
app.route('/send').post(sendPush);

const httpServer = app.listen(4200, () => {
  console.log(`Servidor escuchando en https://makete.netlify.app/${httpServer.address().port}`);
  console.log(`http://localhost:${httpServer.address().port}`);
});

// SOLO ESTAMOS OBTENIENDO LA NOTIFICACION DE FORMA LOCAL
