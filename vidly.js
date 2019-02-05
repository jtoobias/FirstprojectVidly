//http://vidly.com/api/genres


    // Grab the http app methods and create and hanlde the request and exceptions.
const config = require('config');
const express = require('express');
const app = express();
const routes = require('./routes');
// Helmet is a http protection
const helmet = require('helmet');
// Morgan is a logging middleware
const morgan = require('morgan');

    // Added Json parsing -> adding middleware, app.use allows it to be used in the request processing
 app.use(express.json());
 app.use(helmet());
    // This is done using the process object
    // The Environment PORT can be set in terminal, $env:PORT=... 
process.env.port = 3000;
const port = process.env.port || 3000;
console.log(`Environemt Port ${process.env.port}`);

process.env.NODE_ENV = 'development';
console.log(`Environemt Device ${process.env.NODE_ENV}`);
    // Only use logging from morgan in development
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('tiny'));
    console.log('logging active by morgan');
}



console.log('App Name ' + config.get('name'));
console.log('Mail Server ' + config.get('mail.host'));

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
