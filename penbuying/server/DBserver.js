const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const corsOrigins = JSON.parse(process.env.DBSERVER_CORS_ORIGINS);
const corsMethods = JSON.parse(process.env.DBSERVER_CORS_METHODS);
const corsOptions = {
  origin: corsOrigins,
  methods: corsMethods,
  allowedHeaders: ['content-type', 'datatype'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2');
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
});

app.post('/sql_prompt', (req, res) => {
  const sqlQuery = req.body.query;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json('Error executing query');
      return;
    }
    res.json(result);
  });
});

app.listen(process.env.DBSERVER_PORT, process.env.DBSERVER_HOST, () => {
  console.log(
    `DBServer run : http://${process.env.DBSERVER_HOST}:${process.env.DBSERVER_PORT}/`,
  );
  console.log('CORS Options:', corsOptions);
  console.log();
});
