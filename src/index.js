const {app, localConnection, remoteConnection} = require('./app')
require('dotenv').config()

const port = process.env.PORT || 4500;

app.listen(port,async ()=> {
    console.log(await localConnection());
    console.log(await remoteConnection());
    console.log(`Server running at port ${port}`);
})
