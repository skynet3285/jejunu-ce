const express = require('express');
const app = express();
const cors = require('cors');

const serverHOST = '127.0.0.1'; // DBserver Host
const serverPORT = 3001; // DBserver Port

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
});

console.log();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(serverPORT, serverHOST, () => {
  console.log(`DBServer run : http://${serverHOST}:${serverPORT}/`);
});
