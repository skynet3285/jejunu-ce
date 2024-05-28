const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const serverHOST = '127.0.0.1'; // FileServer Host
const serverPORT = 3002; // FileServer Port

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(serverPORT, serverHOST, () => {
  console.log(`FileServer run : http://${serverHOST}:${serverPORT}/`);
});
