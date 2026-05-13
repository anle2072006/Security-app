const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

// Map file extension → Content-Type
const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
};

const server = http.createServer((req, res) => {
  // Default route → index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext         = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 — File not found: ' + req.url);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅  Server chạy tại: http://localhost:${PORT}`);
  console.log(`📁  Đang serve thư mục: ${__dirname}`);
});