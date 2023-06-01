import express from "express";
import cors from "cors";

import { getDataCity, semillaPh } from "./services/chat.js";

const app = express();
app.use(cors());

// Puerto en el que se ejecutará la API
const port = 3000;

app.get("/ciudad", async (req, res) => {
  const { ciudad, departamento, clima } = req.query;
  console.log(ciudad, departamento, clima);
  const data = await getDataCity(ciudad, departamento, clima);
  return res.status(200).json({ result: data });
});

app.get("/semilla", async (req, res) => {
  const { cultivo, clima } = req.query;
  console.log(cultivo, clima );
  const data = await semillaPh(cultivo, clima);

  return res.status(200).json({ result: data });
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API está en funcionamiento en http://localhost:${port}`);
});

console.log("holas");
