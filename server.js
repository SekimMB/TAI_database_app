const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3006"
};

const db = require("./app/models");
const Role = db.role;

function initial() {
    Role.create({
        id: 1,
        name: "employee"
    });

    Role.create({
        id: 2,
        name: "leader"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}


db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Temp route" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/leader.routes')(app);
require('./app/routes/employee.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
