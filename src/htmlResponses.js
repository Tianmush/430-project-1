const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const js = fs.readFileSync(`${__dirname}/../client/script.js`);
const logo = fs.readFileSync(`${__dirname}/../client/logo.png`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};
const getLogo = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(logo);
  response.end();
};

const getJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js);
  response.end();
};

const getDocumentation = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(documentation);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
module.exports.getJS = getJS;
module.exports.getLogo = getLogo;
module.exports.getDocumentation = getDocumentation;
