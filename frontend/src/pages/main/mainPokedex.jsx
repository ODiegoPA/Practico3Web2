import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom"; // Importa Link
import { Container, Row, Col, Image } from "react-bootstrap";
import NavMainMenu from "../../components/MainMenu";
import "./MainPokedex.css"; // Importa el archivo CSS

const MainPokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const location = useLocation();

    useEffect(() => {
        loadPokemons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const loadPokemons = async () => {
        try {
            if (location.state && location.state.url) {
                const response = await axios.get(location.state.url);
                setPokemons(response.data);
            } else {
                const response = await axios.get("http://localhost:3000/pokemon");
                setPokemons(response.data);
            }
        } catch (error) {
            console.error("Error cargando los Pokémon:", error);
        } 
    };

    return (
        <>
            <NavMainMenu />
            <Container className="pokedex-container">
                {pokemons.map((pokemon) => (
                    <Link
                        key={pokemon.id}
                        to={`/pokedex/${pokemon.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Row
                            className="pokemon-row align-items-center mb-3"
                        >
                            <Col xs={2}>
                                <Image
                                    src={`http://localhost:3000/images/pokemon/minis/${pokemon.id}.jpg`}
                                    roundedCircle
                                    fluid
                                />
                            </Col>
                            <Col xs={3}>
                                <span className="pokemon-number">N.º {pokemon.nroPokedex.toString().padStart(3, "0")}</span>
                            </Col>
                            <Col xs={3}>
                                <span className="pokemon-name">{pokemon.nombre}</span>
                            </Col>
                            <Col xs={2}>
                                <Image
                                    src={`http://localhost:3000/images/tipos/${pokemon.idTipo1}.jpg`}
                                    rounded
                                    fluid
                                />
                            </Col>
                            {pokemon.idTipo2 && (
                                <Col xs={2}>
                                    <Image 
                                        src={`http://localhost:3000/images/tipos/${pokemon.idTipo2}.jpg`} 
                                        rounded 
                                        fluid 
                                    />
                                </Col>
                            )}
                        </Row>
                    </Link>
                ))}
            </Container>
        </>
    );
};

export default MainPokedex;
