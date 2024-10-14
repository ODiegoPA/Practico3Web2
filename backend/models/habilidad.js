module.exports = (sequelize, Sequelize) => {
    const Habilidad = sequelize.define("habilidad", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
    });
    return Habilidad;
}