import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { Container, Row, Col, Image, Table } from "react-bootstrap"; 
import './PokemonDetail.css';
import NavMainMenu from "../../components/MainMenu";

const calcularMaxStat = (stat) => {
    return Math.floor(((((2 * stat + 31 + (252 / 4)) / 100) * 100)+5)*1.1);
};
const calcularVida = (stat) => {
    return Math.floor(((((2 * stat + 31 + (252 / 4)) / 100) * 100)+110));
}
const calcularMinVida = (stat) => {
    return Math.floor(((((2 * stat + 0 + (0/4)) / 100) * 100)+110));
}
const calcularMinStat = (stat) => {
    return Math.floor(((((2 * stat + 0) / 100) * 100)+5)*0.9);
};

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState(null);
    const [lineaEvolucion, setLineaEvolucion] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getPokemon();
        getLineaEvolucion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getPokemon = async () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then((response) => {
                setPokemon(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el Pokémon:", error);
            });
    };

    const getLineaEvolucion = async () => {
        axios.get(`http://localhost:3000/pokemon/linea/${id}`)
            .then((response) => {
                setLineaEvolucion(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la línea de evolución:", error);
            });
    };

    if (!pokemon) return <div>Cargando...</div>;

    const statsNormal = {
        hp: pokemon.hp,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        ataqueEspecial: pokemon.ataqueEspecial,
        defensaEspecial: pokemon.defensaEspecial,
        velocidad: pokemon.velocidad,
    };

    const statsMax = {
        hp: calcularVida(pokemon.hp),
        ataque: calcularMaxStat(pokemon.ataque),
        defensa: calcularMaxStat(pokemon.defensa),
        ataqueEspecial: calcularMaxStat(pokemon.ataqueEspecial),
        defensaEspecial: calcularMaxStat(pokemon.defensaEspecial),
        velocidad: calcularMaxStat(pokemon.velocidad),
    };

    const statsMin = {
        hp: calcularMinVida(pokemon.hp),
        ataque: calcularMinStat(pokemon.ataque),
        defensa: calcularMinStat(pokemon.defensa),
        ataqueEspecial: calcularMinStat(pokemon.ataqueEspecial),
        defensaEspecial: calcularMinStat(pokemon.defensaEspecial),
        velocidad: calcularMinStat(pokemon.velocidad),
    };

    return (
        <>
            <NavMainMenu />
            <Container className="pokedex-detail-container" >
            <Row>
                <Col>
                    <div className="imageDiv">
                    <Image
                        src={`http://localhost:3000/images/pokemon/${pokemon.id}.jpg`}
                        fluid
                        rounded
                        style={{ height: '350px' }}
                    />
                    </div>
                </Col>
                <Col xs={8}>
                    <h1>{pokemon.nombre}</h1>
                    <p>{pokemon.descripcion}</p>
                    <h5>Habilidades:</h5>
                    <ul>
                        <li><b>{pokemon.habilidad1.nombre}:</b> {pokemon.habilidad1.descripcion}</li>
                        {pokemon.habilidad2 && <li><b>{pokemon.habilidad2.nombre}:</b> {pokemon.habilidad2.descripcion}</li>}
                        {pokemon.habilidadOculta && <li><b>{pokemon.habilidadOculta.nombre} (Oculta):</b> {pokemon.habilidadOculta.descripcion}</li>}
                    </ul>
                    <h5>Tipos:</h5>
                    <div className="tipos">
                        <Image
                            src={`http://localhost:3000/images/tipos/${pokemon.idTipo1}.jpg`}
                            rounded
                            fluid
                        />
                        {pokemon.idTipo2 && (
                            <Image
                                src={`http://localhost:3000/images/tipos/${pokemon.idTipo2}.jpg`}
                                rounded
                                fluid
                            />
                        )}
                    </div>
                </Col>
            </Row>

            <h3>Estadísticas</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Estadísticas</th>
                        <th>Valor Base</th>
                        <th>Valor a Nivel 100 (EVs 0/IVs 0)</th>
                        <th>Valor a Nivel 100 (EVs 252/IVs 31)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(statsNormal).map((stat) => (
                        <tr key={stat}>
                            <td>{stat.charAt(0).toUpperCase() + stat.slice(1)}</td>
                            <td>{statsNormal[stat]}</td>
                            <td>{statsMin[stat]}</td>
                            <td>{statsMax[stat]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>Línea Evolutiva</h3>
            <div className="containerLinea">
            {lineaEvolucion.map((evo, index) => (
                <Link to={`/pokedex/${evo.id}`} key={evo.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div key={evo.id} className="evolution-line">
                    <div className="pokeInfo">
                    <Image
                        src={`http://localhost:3000/images/pokemon/minis/${evo.id}.jpg`}
                        fluid
                        rounded
                    />
                    {evo.nombre}
                    </div>
                    {evo.nivelEvolucion && index < lineaEvolucion.length - 1 && (
                        <span className="evolution-arrow">
                            → {evo.nivelEvolucion}
                        </span>
                    )}
                </div>
                </Link>
            ))}
            </div>
        </Container>
        </>
    );
};

export default PokemonDetail;
