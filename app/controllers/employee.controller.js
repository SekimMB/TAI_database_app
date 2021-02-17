const db = require("../models");
const config = require("../config/auth.config.js");
const Employee = db.registeredEmployee;
const Role = db.role;

const Op = db.Sequelize.Op;
var user_role='';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    // Save User to Database
    Employee.create({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password : bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.logIn = (req, res) => {
    Employee.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var userRole = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    userRole.push(roles[i].name);
                   // user_role = roles[i].name;
                    console.log("1st use "+userRole);
                }});

            // var token = jwt.sign({ id_employee: user.id_employee, user_role:  }, config.secret, {
            //     expiresIn: 86400 // 24 hours
            // });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push(roles[i].name);
                    console.log("2nd use "+i);
                    var token = jwt.sign({ id_employee: user.id_employee, user_role:authorities  }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                }
                res.status(200).send({
                    id_employee: user.id_employee,
                    name: user.name,
                    surname: user.surname,
                    login: user.login,
                    password: user.password,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
