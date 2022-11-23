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

/* client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query("SELECT best_case FROM climate", function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[30].best_case);
    
    client.end();
  });
}); */

//Her defineres API'en.

app.get("/api/years", async (req, res) => {
  const query1 = `SELECT years FROM climate`;
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
  res.send(years);
});

// gamle api
app.get("/api/hello", async (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Web-serveren startes.
app.listen(PORT, () =>
  console.log(`Serveren kører på http://localhost:${PORT}`)
);
