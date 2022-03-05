require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const httpServer = require('http').createServer(app)
const cors = require('cors')
const usersRoutes = require('./src/routes/user');
const analysesRoutes = require('./src/routes/analyses');
const dashboardRoutes = require('./src/routes/dashboard');
const modulesRoutes = require('./src/routes/modules');
const parametersRoutes = require('./src/routes/parameters');
const sensorsRoutes = require('./src/routes/sensors');
const structuresRoutes = require('./src/routes/structures');
const damagesRoutes = require('./src/routes/damages');

app.use(cors({
   origin: 'http://localhost:3000'
}))

app.use(bodyparser.json())

app.use(usersRoutes)
app.use(analysesRoutes)
app.use(dashboardRoutes)
app.use(modulesRoutes)
app.use(parametersRoutes)
app.use(sensorsRoutes)
app.use(structuresRoutes)
app.use(damagesRoutes)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const server = httpServer.listen(process.env.PORT || 8081, () => {
   console.log(`Server listening on 8081`)
})

const io = require('socket.io')(server, {
   cors: {
      origin: "http://localhost:3000", // É necessário alterar esse IP pro endereço IP que o Frontend está hospedado
      methods: ["GET", "POST"]
   }
})

require('./src/sockets/Analysis')(io);
require('./src/sockets/Metric')(io);