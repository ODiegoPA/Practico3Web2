const db = require('../models');
const path = require('path');
const fs = require('fs');
const Sequelize = require("sequelize"); // Agrega esta línea
const { get } = require('http');
const Op = Sequelize.Op; 
exports.listPokemon = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findAll({
            order: [['nroPokedex', 'ASC']],
            include: [
                {
                    model: db.tipo,
                    as: 'tipo1', 
                    attributes: ['nombre'] 
                },
                {
                    model: db.tipo,
                    as: 'tipo2', 
                    attributes: ['nombre']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad1', 
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad2', 
                    attributes: ['nombre', 'descripcion'] 
                },
                {
                    model: db.habilidad,
                    as: 'habilidadOculta', 
                    attributes: ['nombre', 'descripcion'] 
                },
                {
                    model: db.pokemon, 
                    as: 'evolucionPrevia',
                    attributes: ['id', 'nombre'] 
                },
                {
                    model: db.pokemon, 
                    as: 'evolucionSiguiente',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id, {
            include: [
                {
                    model: db.tipo,
                    as: 'tipo1', 
                    attributes: ['nombre']
                },
                {
                    model: db.tipo,
                    as: 'tipo2', 
                    attributes: ['nombre']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad1', 
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad2', 
                    attributes: ['nombre', 'descripcion'] 
                },
                {
                    model: db.habilidad,
                    as: 'habilidadOculta', 
                    attributes: ['nombre', 'descripcion'] 
                },
                {
                    model: db.pokemon, 
                    as: 'evolucionPrevia',
                    attributes: ['id', 'nombre'] 
                },
                {
                    model: db.pokemon, 
                    as: 'evolucionSiguiente',
                    attributes: ['id', 'nombre'] 
                }
            ]
        });
        if (pokemon) {
            res.status(200).json(pokemon);
        } else {
            res.status(404).json({ msg: 'Pokemon no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createPokemon = async (req, res) => {
    
    try {
        const pokemon = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            descripcion: req.body.descripcion,
            hp: req.body.hp,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            velocidad: req.body.velocidad,
            ataqueEspecial: req.body.ataqueEspecial,
            defensaEspecial: req.body.defensaEspecial,
            nivelEvolucion: req.body.nivelEvolucion !== '' ? req.body.nivelEvolucion : null, 
            idHabilidad1: req.body.idHabilidad1 !== '' ? req.body.idHabilidad1 : null, 
            idHabilidad2: req.body.idHabilidad2 !== '' ? req.body.idHabilidad2 : null,
            idHabilidadOculta: req.body.idHabilidadOculta,
            idTipo1: req.body.idTipo1,
            idTipo2: req.body.idTipo2 !== '' ? req.body.idTipo2 : null, 
            idEvPrevia: req.body.idEvPrevia !== '' ? req.body.idEvPrevia : null, 
            idEvSiguiente: req.body.idEvSiguiente !== '' ? req.body.idEvSiguiente : null 
        };

        const pokemonCreado = await db.pokemon.create(pokemon);
        const evPrevia = await db.pokemon.findByPk(pokemonCreado.idEvPrevia);
        const evSiguiente = await db.pokemon.findByPk(pokemonCreado.idEvSiguiente);

        if (evPrevia) {
            evPrevia.idEvSiguiente = pokemonCreado.id;
            await evPrevia.save();
        }
        if (evSiguiente) {
            evSiguiente.idEvPrevia = pokemonCreado.id;
            await evSiguiente.save();
        }
    
        res.status(201).json(pokemonCreado);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updatePokemon = async (req, res) => {
    const id = req.params.id;

    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        pokemon.nombre = req.body.nombre;
        pokemon.nroPokedex = req.body.nroPokedex;
        pokemon.descripcion = req.body.descripcion;
        pokemon.hp = req.body.hp;
        pokemon.ataque = req.body.ataque;
        pokemon.defensa = req.body.defensa;
        pokemon.velocidad = req.body.velocidad;
        pokemon.ataqueEspecial = req.body.ataqueEspecial;
        pokemon.defensaEspecial = req.body.defensaEspecial;
        pokemon.nivelEvolucion = req.body.nivelEvolucion !== '' ? req.body.nivelEvolucion : null;
        pokemon.idHabilidad1 = req.body.idHabilidad1 !== '' ? req.body.idHabilidad1 : null;
        pokemon.idHabilidad2 = req.body.idHabilidad2 !== '' ? req.body.idHabilidad2 : null;
        pokemon.idHabilidadOculta = req.body.idHabilidadOculta !== '' ? req.body.idHabilidadOculta : null;
        pokemon.idTipo1 = req.body.idTipo1;
        pokemon.idTipo2 = req.body.idTipo2 !== '' ? req.body.idTipo2 : null;
        pokemon.idEvPrevia = req.body.idEvPrevia !== '' ? req.body.idEvPrevia : null;
        pokemon.idEvSiguiente = req.body.idEvSiguiente !== '' ? req.body.idEvSiguiente : null;

        await pokemon.save();
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.subirFoto = async (req, res) => {
    const id = req.params.id;
    const image = req.files ? req.files.photo : null;
    const miniImage = req.files ? req.files.miniPhoto : null;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        
        
        if (image){
            const path = __dirname + '/../public/images/pokemon/' + pokemon.id + '.jpg';	
            image.mv(path, function (err) {
                if (err) {
                    console.log('error al subir')
                    return res.status(500).json({ error: 'Error al subir la imagen' });
                }
            });
        }

        if (miniImage){
            const pathMini = __dirname + '/../public/images/pokemon/minis/' + pokemon.id + '.jpg';
            miniImage.mv(pathMini, function (err) {
                if (err) {
                    console.log('error al subir')
                    return res.status(500).json({ error: 'Error al subir la imagen' });
                }
            });
            
        }

        
        
        res.status(200).json({msg: 'Imagen subida correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getListByFilters = async (req, res) => {
    const tipo1 = req.params.tipo1;
    const tipo2 = req.params.tipo2;
    const nombre = req.params.nombre;
    const numeroPokedex = req.params.nro;

    console.log(tipo1, tipo2, nombre, numeroPokedex);

    const whereCondition = {};

    if (tipo1 && tipo1 !== 'null') {
        whereCondition[Sequelize.Op.or] = [
            { idTipo1: tipo1 },
            { idTipo2: tipo1 }  
        ];
    }

    if (tipo2 && tipo2 !== 'null') {
        whereCondition.idTipo2 = tipo2;
    }

    if (nombre !== 'null') {
        whereCondition.nombre = {
            [Sequelize.Op.like]: `${nombre}%` 
        };
    }

    if (numeroPokedex !== 'null') {
        whereCondition.nroPokedex = numeroPokedex;
    }


    try {
        const pokemon = await db.pokemon.findAll({
            where: whereCondition,
            order: [['nroPokedex', 'ASC']],
            include: [
                {
                    model: db.tipo,
                    as: 'tipo1',
                    attributes: ['nombre']
                },
                {
                    model: db.tipo,
                    as: 'tipo2',
                    attributes: ['nombre']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad1',
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: db.habilidad,
                    as: 'habilidad2',
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: db.habilidad,
                    as: 'habilidadOculta',
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: db.pokemon,
                    as: 'evolucionPrevia',
                    attributes: ['id', 'nombre']
                },
                {
                    model: db.pokemon,
                    as: 'evolucionSiguiente',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getLineaEvolutiva = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        const respuesta = [];
        respuesta.push(pokemon);

        let actual = pokemon;

        while (actual.idEvSiguiente != null) {
            actual = await db.pokemon.findByPk(actual.idEvSiguiente);
            respuesta.push(actual);
        }

        actual = pokemon;

        while (actual.idEvPrevia != null) {
            actual = await db.pokemon.findByPk(actual.idEvPrevia);
            respuesta.unshift(actual);
        }

        return res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deletePokemon = async (req, res) => {
    const id = req.params.id;
    try{
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon){
            return;
        }
        await pokemon.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

exports.getImagenPokemon = async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../public/images/pokemon/' + id + '.jpg')

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({msg: 'Imagen no encontrada'});
        } else
        res.sendFile(imagePath);
    });
}

exports.getMiniImagenPokemon = async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../public/images/pokemon/minis/' + id + '.jpg')

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({msg: 'Imagen no encontrada'});
        }
        res.sendFile(imagePath);
    });
}

async function getPokemonOr404(id, res){
    try{
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon){
            res.status(404).json({msg: 'Pokemon no encontrado'});
        }
        return pokemon;
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}