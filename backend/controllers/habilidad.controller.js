const db = require('../models');
const path = require('path');

exports.listHabilidades = async (req, res) => {
    try{
        const habilidades = await db.habilidad.findAll({
            order: [['nombre', 'ASC']]
        });
        res.status(200).json(habilidades);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
exports.getHabilidadById = async (req, res) => {
    const id = req.params.id;
    try{
        const habilidad = await db.habilidad.findByPk(id);
        if (habilidad){
            res.status(200).json(habilidad);
        } else {
            res.status(404).json({msg: 'Habilidad no encontrada'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
} 
exports.createHabilidad = async (req, res) => {
    try{
        const habilidad = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }
        const habilidadCreada = await db.habilidad.create(habilidad);
        res.status(201).json(habilidadCreada);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
exports.updateHabilidad = async (req, res) => {
    const id = req.params.id;
    try{
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad){
            return;
        }
        habilidad.nombre = req.body.nombre;
        habilidad.descripcion = req.body.descripcion;
        await habilidad.save();
        res.status(200).json(habilidad);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
exports.deleteHabilidad = async (req, res) => {
    const id = req.params.id;
    try{
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad){
            return;
        }
        await habilidad.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
async function getHabilidadOr404(id, res){
    try{
        const habilidad = await db.habilidad.findByPk(id);
        if (!habilidad){
            res.status(404).json({msg: 'Habilidad no encontrada'});
        }
        return habilidad;
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}