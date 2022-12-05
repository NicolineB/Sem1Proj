const { Client } = require("pg");
const express = require("express");
const morgan = require("morgan"); // Some nice logging

const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER || "lzdkbzkl";
const DB_HOST = process.env.DB_HOST || "mouse.db.elephantsql.com";
const DB_NAME = process.env.DB_NAME || "lzdkbzkl";
const DB_PW = process.env.DB_PW || "VYWTjVbx3KdcdaNK2H9ExTPxTzmHvlhH";
const DB_PORT = process.env.DB_PORT || 5432;

/*
 * Herunder laves web-serveren. Den indeholder din html (fra public-folderen)
 * og API'en så der er forbindelse videre til databasen fra JavaScript. Det er "to i en".
 */
const app = express();
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PW,
  port: DB_PORT,
});

client.connect();

app.use(express.text());
app.use(express.static("public"));
app.use(morgan("combined"));

//Her defineres API'en for tabellen climate
app.post("/api/climate/:years", async (req, res) => {
  const years = req.params.years;
  console.log(years);
  console.log("hejsa");
  const query1 = `SELECT * FROM climate WHERE years = ${years}`;
  try {
    let queryData = await client.query(query1);
    // Giv svar tilbage til JavaScript
    res.json({
      ok: true,
      data: queryData.rows,
    });
  } catch (error) {
    // Hvis query fejler, fanges det her.
    // Send fejlbesked tilbage til JavaScript
    res.json({
      ok: false,
      message: error.message,
    });
  }
  res.send(query1);
});

// Her defineres API'en for tabellen species
app.post("/api/species", async (req, res) => {
  const query2 = `SELECT * FROM species`;
  try {
    let queryData = await client.query(query2);
    res.json({
      ok: true,
      data: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
  res.send(query2);
});

function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}

// Web-serveren startes.
app.listen(PORT, () =>
  console.log(`Serveren kører på http://localhost:${PORT}`)
);
