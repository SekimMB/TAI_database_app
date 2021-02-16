const db = require("../models");
const ROLES = db.role;
const Employee = db.registeredEmployee;

checkDuplicateLogin = (req, res, next) => {
    // Login
    Employee.findOne({
        where: {
            login: req.body.login
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Login is already in use!"
            });
            return;
        }
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifyLogIn = {
    checkDuplicateLogin: checkDuplicateLogin,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifyLogIn;
