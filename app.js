const answers = require('./answers.js')
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const body =
`<body>
  <h1>Good Morning</h1>
  <div id="container">
  <div id="block1">
  <p id="num1" class="red">Hello</p>
  <p id="num2" class="red">Hello</p>
  </div>
  <p>Hello</p>
  </div>
  <span class="red">Hello</span>
</body>`

css = answers.question_4

html =
`<!DOCTYPE html>
<html>
  <head>
    ${css}
  </head>
${body}
</html>`

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
