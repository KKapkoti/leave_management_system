//server.js

const app = require('./app'); 
// const http = require('http');

// //Http server
// const server = http.createServer(app);




//server
const PORT = process.env.PORT ;
  app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
});





