const authJwt = require("../middleware/authJWT");
const controller = require("../controllers/leader.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/leader/get-tasks",[authJwt.verifyToken, authJwt.isLeader], controller.gettasks);
    app.post("/api/leader/add-task",[authJwt.verifyToken, authJwt.isLeader], controller.addtask);
    app.put("/api/leader/modify-task",[authJwt.verifyToken, authJwt.isLeader],controller.modifytask);
    app.put("/api/leader/add-employee-totask",[authJwt.verifyToken, authJwt.isLeader],controller.addemployee);
    app.put("/api/leader/delete-employee-totask",[authJwt.verifyToken, authJwt.isLeader],controller.deleteemployee);
    app.delete("/api/leader/delete-task",[authJwt.verifyToken, authJwt.isLeader], controller.deletetask);

};
