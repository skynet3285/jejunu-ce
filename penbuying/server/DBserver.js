const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const app = express();
const serverPORT = 3001; // DBserver Port
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL & MariaDB 연결
// 보안을 위해 .env을 통한 환경변수 설정
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
});

console.log();

// to use
// reference at query.QueryPrompt
app.post('/promptpost', (req, res) => {
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

app.listen(serverPORT, () => {
  console.log(`Server run : http://localhost:${serverPORT}/`);
});
