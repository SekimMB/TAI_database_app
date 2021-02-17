const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.registeredEmployee;
let user_id='';
let employee_role='';

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.id_employee = decoded.id_employee;
        employee_role = decoded.user_role;
        next();
    });
};

isAdmin = (req, res, next) => {
    console.log(req.id_employee);
    User.findByPk(req.id_employee).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isLeader = (req, res, next) => {
    User.findByPk(req.id_employee).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "leader") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Leader Role!"
            });
        });
    });
};

isLeaderOrAdmin = (req, res, next) => {
    User.findByPk(req.id_employee).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "leader") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Leader or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isLeader: isLeader,
    isLeaderOrAdmin: isLeaderOrAdmin
};
module.exports = authJwt;
