module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING
        },
        nroPokedex:{
            type: Sequelize.INTEGER
        },
        descripcion: {
            type: Sequelize.STRING
        },
        hp: {
            type: Sequelize.INTEGER
        },
        ataque: {
            type: Sequelize.INTEGER
        },
        defensa: {
            type: Sequelize.INTEGER
        },
        velocidad: {
            type: Sequelize.INTEGER
        },
        ataqueEspecial: {
            type: Sequelize.INTEGER
        },
        defensaEspecial: {
            type: Sequelize.INTEGER
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER
        },
        idHabilidad1: {
            type: Sequelize.INTEGER
        },
        idHabilidad2: {
            type: Sequelize.INTEGER
        },
        idHabilidadOculta: {
            type: Sequelize.INTEGER
        },
        idTipo1: {
            type: Sequelize.INTEGER
        },
        idTipo2: {
            type: Sequelize.INTEGER
        },
        idEvPrevia: {
            type: Sequelize.INTEGER
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER
        },
        
    });
    return Pokemon;
}