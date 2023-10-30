const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    CLIENT: {
        '/': htmlHandler.getIndex,
        '/script.js': htmlHandler.getJS,
        '/style.css': htmlHandler.getCSS,
        '/logo.png': htmlHandler.getLogo,
        '/documentation.html': htmlHandler.getDocumentation,
    },
    JSON: {
        '/getCardList': jsonHandler.getCardList,
        '/getCardInfo': jsonHandler.getCardInfo,
        notFound: jsonHandler.notFound,
    },
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if (urlStruct.CLIENT[parsedUrl.pathname]) {
        return urlStruct.CLIENT[parsedUrl.pathname](request, response);
    }
    if (urlStruct.JSON[parsedUrl.pathname]) {
        return urlStruct.JSON[parsedUrl.pathname](request, response);
    }

    return urlStruct.JSON.notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
    // console.log(`Listening on http://127.0.0.1:${port}`);
});
