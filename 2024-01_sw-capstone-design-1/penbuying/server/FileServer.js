const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const corsOrigins = JSON.parse(process.env.FILESERVER_CORS_ORIGINS);
const corsMethods = JSON.parse(process.env.FILESERVER_CORS_METHODS);
const corsOptions = {
  origin: corsOrigins,
  methods: corsMethods,
  allowedHeaders: ['application/json', 'datatype'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.get('/file_download', (req, res) => {
  const fileName = req.query.file;
  const filePath = path.join(__dirname, './files', fileName);

  res.download(filePath, fileName, err => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('File download failed.');
    }
  });
});

app.listen(process.env.FILESERVER_PORT, process.env.FILESERVER_HOST, () => {
  console.log(
    `FILEServer run : http://${process.env.FILESERVER_HOST}:${process.env.FILESERVER_PORT}/`,
  );
  console.log('CORS Options:', corsOptions);
  console.log();
});
