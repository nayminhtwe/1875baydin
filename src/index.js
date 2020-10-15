const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
const Category = require('./app/models').Category
dotenv.config()






const server = http.createServer(app)

const port = process.env.PORT || 4500;

server.listen(port,async ()=> {
    console.log(`Server running at port ${port}`);
})
