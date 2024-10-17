import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavMainMenu from "../../components/MainMenu";

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
            <NavMainMenu/>
        <Container>
            <Row>
                {pokemons.map((pokemon) => (
                    <Col md={4} key={pokemon.id} className="mb-4">
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={`http://localhost:3000/images/pokemon/${pokemon.id}.jpg`} 
                                alt={pokemon.nombre} 
                            />
                            <Card.Body>
                                <Card.Title>{pokemon.nombre}</Card.Title>
                                <Card.Text>
                                    Número de Pokédex: {pokemon.nroPokedex}
                                </Card.Text>
                                <Card.Text>
                                    Tipo 1: {pokemon.tipo1 ? pokemon.tipo1.nombre : "Desconocido"}
                                </Card.Text>
                                <Card.Text>
                                    {pokemon.tipo2 && (
                                        <span>Tipo 2: {pokemon.tipo2.nombre}</span>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    );
};

export default MainPokedex;
