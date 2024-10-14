module.exports = app => {
    require('./tipo.routes')(app);
    require('./pokemon.routes')(app);
    require('./habilidad.routes')(app);
}