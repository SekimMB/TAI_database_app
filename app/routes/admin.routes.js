const authJwt = require("../middleware/authJWT");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

app.get("/api/admin/get-teams",[authJwt.verifyToken, authJwt.isAdmin], controller.getteams);
app.post("/api/admin/add-team",[authJwt.verifyToken, authJwt.isAdmin], controller.addteam);
app.delete("/api/admin/delete-team",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteteam);

};

