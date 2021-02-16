module.exports = (sequelize, Sequelize) => {
    const tasks = sequelize.define("tasks", {
        id_task: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_employee: {
            type: Sequelize.INTEGER
        },
        id_team: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.STRING
        }
    });

    return tasks;
};
