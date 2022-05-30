var http = require('http'), httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({ target: 'http://localhost:9000' }).listen(8000); // See (†)
//
// Create your target server
//
var data = '';
http.createServer(function (req, res) {
    console.log('HEADERS::', req.headers);
    console.log('\n\n -------RQ ---------');
    //  res.writeHead(200, { 'Content-Type': 'text/plain' });
    //  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers));
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        console.log('BODY ::', data); // 'Buy the milk'
        console.log('\n\n----------- RQ END ------------\n\n');
        res.end();
    });
}).listen(9000);
