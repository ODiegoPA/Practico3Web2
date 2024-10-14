const db = require("../models");
const path = require('path');
const fs = require('fs');

exports.listTipos = async (req, res) => {
    try{
        const tipos = await db.tipo.findAll({
            order: [['nombre', 'ASC']]
        });
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

exports.getTiposById = async (req, res) => {
    const id = req.params.id;
    try{
        const tipo = await db.tipo.findByPk(id);
        if (tipo){
            res.status(200).json(tipo);
        } else {
            res.status(404).json({msg: 'Tipo no encontrado'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
exports.createTipo = async (req, res) => {
    const image = req.files.photo;
    try{
        const tipo = {
            nombre: req.body.nombre
        }
        const tipoCreado = await db.tipo.create(tipo);
        const path = __dirname + '/../public/images/tipos/' + tipoCreado.id + '.jpg';
        image.mv(path, function (err){
            if (err) {
                return res.status(500).json({ error: 'Error al subir la imagen' });
            }
        });
        res.status(201).json(tipoCreado);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
exports.updateTipo = async (req, res) => {
    const id = req.params.id;
    const photo = req.files ? req.files.photo : null;
    try{
        const tipo = await getTipoOr404(id, res);
        if (!tipo){
            return;
        }
        
        tipo.nombre = req.body.nombre;
        if(photo){
            const path = __dirname + '/../public/images/tipos/' + tipo.id + '.jpg';
            photo.mv(path, function (err){
                if (err) {
                    return res.status(500).json({ error: 'Error al subir la imagen' });
                }
            });
        }
        await tipo.save();
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

exports.deleteTipo = async (req, res) => {
    const id = req.params.id;
    try{
        const tipo = await getTipoOr404(id, res);
        if (!tipo){
            return;
        }
        await tipo.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

exports.getImagenTipo = async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../public/images/tipos/' + id + '.jpg');

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({msg: 'Imagen no encontrada'});
        } 
        res.sendFile(imagePath);
    });
}
async function getTipoOr404(id, res){
    try{
        const tipo = await db.tipo.findByPk(id);
        if (!tipo){
            res.status(404).json({msg: 'Tipo no encontrado'});
            return null;
        }
        return tipo;
    } catch (error) {
        res.status(500).json({ error: error.message})
        return null;
    }
}