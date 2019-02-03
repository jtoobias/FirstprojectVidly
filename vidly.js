//http://vidly.com/api/genres


    // Grab the http app methods and create and hanlde the request and exceptions.
const express = require('express');
const app = express();
const routes = require('./routes');

    // Added Json parsing -> adding middleware, app.use allows it to be used in the request processing
 app.use(express.json());
    // This is done using the process object
    // The Environment PORT can be set in terminal, $env:PORT=... 
const port = process.env.port || 3000;
    // Use back tick ` (below esc) for value inputs in string
app.listen(port,()=> console.log(`listening on Port ${port}...`));

app.use(routes);
// EXPRESS middle-ware
   // This allows body data to be sent through the url and by setting extended to true allows for complex types like objects and arrays.
   // e.g. /api/genre/name=value&id=id
app.use(express.urlencoded({extended: true}));
   // Use a local folder called public. This means if we go /api/(a file in public)e.g. file.txt so /api/file.txt - it will show the content of file.txt
   // This can hold our CSS (frontend stuff) and images aswell
app.use(express.static('./public'));   
