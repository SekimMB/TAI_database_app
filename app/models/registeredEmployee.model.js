module.exports = (sequelize, Sequelize) => {
    const reg_Employee = sequelize.define("registered_employees", {
        id_employee: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return reg_Employee;
};
