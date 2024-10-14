module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo.controller.js");

    router.get("/", controller.listTipos);
    router.get("/:id", controller.getTiposById);
    router.post("/", controller.createTipo);
    router.put("/:id", controller.updateTipo);
    router.delete("/:id", controller.deleteTipo);
    router.get("/:id/imagen", controller.getImagenTipo);
    app.use('/tipos', router);
}