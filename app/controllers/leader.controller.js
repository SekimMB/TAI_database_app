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

};

exports.modifytask = (req,res)=>{

    Tasks.update(
        { id_employee : req.body.id_employee,
            id_team : req.body.id_team,
            title : req.body.title,
            description : req.body.description,
            time  :req.body.time },
       {where: { id_task:req.body.id_task }}
    ).then( res.send({ message: "Task was changed successfully!" }))
        .catch( res.send({ message: "Failed to change task!" }))

};

exports.addemployee = (req,res)=>{
    Tasks.update(
        { id_employee : req.body.id_employee,
    },
        {where: { id_task:req.body.id_task }}
    ).then( res.send({ message: "Added employee to task!" }))
        .catch( res.send({ message: "Failed to add employee to task!" }))

};

exports.deleteemployee = (req,res)=>{
    Tasks.update(
        { id_employee : null,
        },
        {where: { id_task:req.body.id_task }})
        .then( res.send({ message: "Removed employee from task!" }))
        .catch( res.send({ message: "Failed to remove employee from task!" }))



};
