const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
const db = require('./database/db')

//models
const Category = require('./app/remote-models').Category
const User = require('./app/local-models').User

dotenv.config()
const connection1 = () => {
    return new Promise((resolve,reject) => {
        db.localDB.authenticate().then(err => {
            if (err) reject(err)
            resolve('Connected to local db.')
        })
    })
}
const connection2 = () => {
    return new Promise((resolve, reject) => {
        db.remoteDB.authenticate().then(err => {
            if (err) reject(err)
            resolve('Connected to remote db.')
        })
    })
}





const server = http.createServer(app)

const port = process.env.PORT || 4500;

server.listen(port,async ()=> {
    console.log(await connection1());
    console.log(await connection2());
    console.log(await Category.findAll({
        attributes: ['name', 'owner', 'species']
    }));
    console.log(`Server running at port ${port}`);
})
