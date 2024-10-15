const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.pokemon = require("./pokemon.js")(sequelize, Sequelize);
db.habilidad = require("./habilidad.js")(sequelize, Sequelize);
db.tipo = require("./tipo.js")(sequelize, Sequelize);

// Definir asociaciones
db.tipo.hasMany(db.pokemon, {
    foreignKey: "idTipo1", // Usar idTipo1 como clave foránea
    as: "pokemonTipo1",
});

db.pokemon.belongsTo(db.tipo, {
    foreignKey: "idTipo1", // Usar idTipo1 como clave foránea
    as: "tipo1",
});

db.tipo.hasMany(db.pokemon, {
    foreignKey: "idTipo2", // Usar idTipo2 como clave foránea
    as: "pokemonTipo2",
});

db.pokemon.belongsTo(db.tipo, {
    foreignKey: "idTipo2", // Usar idTipo2 como clave foránea
    as: "tipo2",
});

db.habilidad.hasMany(db.pokemon, {
    foreignKey: "idHabilidad1", // Usar idHabilidad1 como clave foránea
    as: "pokemonHabilidad1",
});

db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "idHabilidad1", // Usar idHabilidad1 como clave foránea
    as: "habilidad1",
});

db.habilidad.hasMany(db.pokemon, {
    foreignKey: "idHabilidad2", // Usar idHabilidad2 como clave foránea
    as: "pokemonHabilidad2",
});

db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "idHabilidad2", // Usar idHabilidad2 como clave foránea
    as: "habilidad2",
});

db.habilidad.hasMany(db.pokemon, {
    foreignKey: "idHabilidadOculta", // Usar idHabilidadOculta como clave foránea
    as: "pokemonHabilidadOculta",
});

db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "idHabilidadOculta", // Usar idHabilidadOculta como clave foránea
    as: "habilidadOculta",
});

db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "idEvPrevia", // Usar idEvPrevia como clave foránea
    as: "evolucionPrevia",
});
db.pokemon.hasMany(db.pokemon, {
    foreignKey: "idEvPrevia",
    as: "pokemonEvolucionPrevia",
});

db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "idEvSiguiente", // Usar idEvSiguiente como clave foránea
    as: "evolucionSiguiente",
});
db.pokemon.hasMany(db.pokemon, {
    foreignKey: "idEvSiguiente",
    as: "pokemonEvolucionSiguiente",
});


module.exports = db;
