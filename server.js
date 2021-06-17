const hapi = require('hapi');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/company.routes');
const db = require('./models');
const Company = db.company

//connect with mongoDB
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log(`app is connected to ${db.url}`);
});

mongoose.connection.on('error', err => {
    console.log('error while connecting to mongodb', err);
});
const server = new hapi.Server({ port: 8000, host: 'localhost' });

server.route({
    path: '/api',
    method: 'GET',
    handler: (req, h) => {
        return 'Welcome!!'
    }
});

server.route(companyRoutes);

server.start(err => {
    if (err) {
        throw err;
    }
    console.log(`Server Running at PORT ${server.info.port}`);
});