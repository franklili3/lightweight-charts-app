var http=require('http');
var fs = require('fs');
var url = require('url');

// create server
http.createServer(function(request,response) {
  // parse request, including file name
  var pathname= url.parse(request.url).pathname;
  // output the file name requesting
  console.log("Request for "+ pathname + "  received.");

  var firstDir = pathname && pathname.split('/')[1];
  var ContentType = {'Content-Type': 'text/html'};

  // js - application/x-javascript
  if (firstDir && firstDir === 'static') {
    ContentType = {'Content-Type': 'text/css'};
  } 
  if (firstDir && firstDir === 'js') {
    ContentType = {'Content-Type': 'application/x-javascript'}
  }

  // read content from files
  fs.readFile(pathname.substr(1),function(err, data) {
    if(err) {
      console.log(err);
      //HTTP status 404 ： NOT FOUND
      //Content Type:text/plain
      response.writeHead(404, {'Content-Type': 'text/html'});
    }
    else {
      //HTTP status 200 ： OK
      //Content Type:text/plain
      response.writeHead(200, ContentType);

      // write back the response
      response.write(data.toString());
    }
    // send response data
    response.end();
  });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');


