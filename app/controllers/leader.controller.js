const db = require("../models");
const Tasks = db.tasks;

exports.addtask = (req, res) => {
    // Save Team to Database
    Tasks.create({
        id_employee : req.body.id_employee,
        id_team : req.body.id_team,
        title : req.body.title,
        description : req.body.description,
        time  :req.body.time
    }).then(
        res.send("Task created"))
};

exports.deletetask = (req,res)=>{
    Tasks.destroy({
        where: {
            title: req.body.title
        }
    }).then( res.send({ message: "Task was deleted successfully!" }))
};

exports.gettasks = (req,res)=>{
    Tasks.findAll()
        .then(tasks=>res.send(tasks))

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
