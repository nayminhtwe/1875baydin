const http = require('http')
const {app, localConnection, remoteConnection} = require('./app')
const dotenv = require('dotenv')
dotenv.config()
//models
const Category = require('./app/remote-models').Category
const User = require('./app/local-models').User



const server = http.createServer(app)

const port = process.env.PORT || 4500;

server.listen(port,async ()=> {
    console.log(await localConnection());
    console.log(await remoteConnection());
    console.log(await Category.findAll({
        attributes: ['name', 'owner', 'species']
    }));
    console.log(`Server running at port ${port}`);
})
