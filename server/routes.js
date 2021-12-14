const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Contente-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
           const parsedBody = Buffer.concat(body);
           const parsedBody1 = parsedBody.toString;
           const message = parsedBody1.split('=')[1];
           fs.writeFileSync('message.txt', message, err =>{
            res.statusCode = 302;vvdk
            res.setHeader('Location', '/');
            return res.end();
           });
        });

       
    }
    res.setHeader('Contente-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prova Teknike</title></head>');
    res.write('<body><h1>Server hello</h1></body>');
    res.write('</html>');
    res.end();
} 

exports.handler = requestHandler;
exports.someText = "Hardcoded text";

