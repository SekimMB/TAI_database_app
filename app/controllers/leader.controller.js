const db = require("../models");
const Tasks = db.tasks;

exports.addtask = (req, res) => {
    // Save Team to Database
    Tasks.create({
        name: req.body.name,
    }).then(
        res.send("Team created"))
};

exports.deletetask = (req,res)=>{
    Tasks.destroy({
        where: {
            title: req.body.title
        }
    }).then( res.send({ message: "Team was deleted successfully!" }))
};

exports.gettasks = (req,res)=>{
    let tasks = Tasks.findAll()
        .then(res.send(tasks))

}

exports.modifytask = (req,res)=>{

    let teams = Teams.findAll()
        .then(res.send(teams))

}

exports.addemployee = (req,res)=>{

    let teams = Teams.findAll()
        .then(res.send(teams))

}

exports.deleteemployee = (req,res)=>{

    let teams = Teams.findAll()
        .then(res.send(teams))

}
