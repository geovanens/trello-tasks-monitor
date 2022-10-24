// Rodar localmente

// import ecosystem = require("../.ecosystem.config.js");

// if (process.env.ENV !== 'production') {
//   const env = ecosystem.apps[0].env_development;
//   process.env = Object.assign(process.env, env);
// }

import MongoDb from "./models/mongoDb";
import app from "./server/express";

const PORT = process.env.PORT || 3000;

MongoDb.CONNECT().then(() => {
  app.listen(PORT, () => {
    console.log("App iniciado na porta", PORT);
  });
});