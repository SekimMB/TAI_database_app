const db = require("../models");
const Teams = db.teams;

exports.addteam = (req, res) => {
    // Save Team to Database
    Teams.create({
        name: req.body.name,
    }).then(
        res.send("Team created"))
};

exports.deleteteam = (req,res)=>{
    Teams.destroy({
        where: {
            name: req.body.name
        }
    }).then( res.send({ message: "Team was deleted successfully!" }))
};

exports.getteams = (req,res)=>{
     let teams = Teams.findAll()
         .then(res.send(teams))

}
