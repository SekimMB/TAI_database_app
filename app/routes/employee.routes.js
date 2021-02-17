const controller = require("../controllers/employee.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/employee/register", controller.register);
    app.post("/api/employee/logIn", controller.logIn);
    app.get("/api/employee/getEmployeeTasks",controller.getEmployeeTasks)
};
