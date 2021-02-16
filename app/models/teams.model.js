module.exports = (sequelize, Sequelize) => {
    const teams = sequelize.define("teams", {
        id_team: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
    });
    return teams;
};
