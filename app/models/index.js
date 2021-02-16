const config = require("../config/database.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.registeredEmployee = require("./registeredEmployee.model.js")(sequelize, Sequelize);
db.role  = require("./role.model")(sequelize, Sequelize);
db.tasks = require("./tasks.model")(sequelize, Sequelize);
db.teams = require("./teams.model")(sequelize, Sequelize);

db.role.belongsToMany(db.registeredEmployee, {
    through: "registeredEmployee_roles",
    foreignKey: "roleId",
    otherKey: "id_employee"

});
db.registeredEmployee.belongsToMany(db.role, {
    through: "registeredEmployee_roles",
    foreignKey: "id_employee",
    otherKey: "roleId"
});

db.ROLES = ["employee", "admin", "leader"];

module.exports = db;
