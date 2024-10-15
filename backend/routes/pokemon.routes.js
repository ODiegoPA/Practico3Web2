module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller.js");

    router.get("/", controller.listPokemon);
    router.get("/:id", controller.getPokemonById);
    router.post("/", controller.createPokemon);
    router.put("/:id", controller.updatePokemon);
    router.delete("/:id", controller.deletePokemon);
    router.get("/:id/imagen", controller.getImagenPokemon);
    router.get("/:id/miniImagen", controller.getMiniImagenPokemon);
    router.get("/tipo1/:tipo1/tipo2/:tipo2?/nombre/:nombre?/nro/:nro?", controller.getListByFilters);
    router.get("/linea/:id", controller.getLineaEvolutiva);
    app.use('/pokemon', router);
}