import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";

const ListPokemon = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getListPokemon();
        document.title = "Lista de Pokemon";
    }, []);

    const getListPokemon = async () => {
        axios.get("http://localhost:3000/pokemon")
        .then(res => {
            setPokemons(res.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const eliminarPokemon = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este Pokemon?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/pokemon/${id}`)
        .then(res => {
            console.log(res.data);
            getListPokemon();
        }).catch(error => {
            console.log(error);
        });
    };

    return ( 
        <>
            <NavAdminMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Lista de Pokemon</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th style={{ width: '5%' }}>N Pokedex</th>
                                            <th>Nombre</th>
                                            <th style={{ width: '15%' }}>Descripcion </th>
                                            <th style={{ width: '15%' }}>Habilidades</th>
                                            <th style={{ width: '20%' }} >Estadisticas</th>
                                            <th style={{ width: '15%' }}>Tipos</th>
                                            <th>Pokemon Siguiente</th>
                                            <th>Pokemon Anterior</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pokemons.map((pokemon) => (
                                            <tr key={pokemon.id}>
                                                <td>
                                                    <img src={`http://localhost:3000/pokemon/${pokemon.id}/imagen`} alt={pokemon.nombre} width="50" />
                                                </td>
                                                <td>{pokemon.nroPokedex}</td>
                                                <td>{pokemon.nombre}</td>
                                                <td>{pokemon.descripcion}</td>
                                                <td>
                                                    <b>Habilidad 1: </b>{pokemon.habilidad1?.nombre || "Sin habilidad"}<br />
                                                    <b>Habilidad 2:</b> {pokemon.habilidad2?.nombre || "Sin habilidad"}<br />
                                                    <b>Habilidad Oculta: </b> {pokemon.habilidadOculta?.nombre || "Sin habilidad"}
                                                </td>
                                                <td>
                                                    <b>HP:</b> {pokemon.hp}<br />
                                                    <b>Ataque:</b> {pokemon.ataque}<br />
                                                    <b>Ataque Especial:</b> {pokemon.ataqueEspecial}<br />
                                                    <b>Defensa:</b> {pokemon.defensa}<br />
                                                    <b>Defensa Especial:</b> {pokemon.defensaEspecial}<br />
                                                    <b>Velocidad:</b> {pokemon.velocidad}
                                                </td>
                                                <td>
                                                    {pokemon.tipo1 ? (
                                                        <>
                                                            <img src={`http://localhost:3000/tipos/${pokemon.idTipo1}/imagen`} alt={pokemon.tipo1.nombre} /><br />
                                                        </>
                                                    ) : ("No tiene Tipo 1")} <br />
                                                    {pokemon.tipo2 ? (
                                                        <>
                                                            <img src={`http://localhost:3000/tipos/${pokemon.idTipo2}/imagen`} alt={pokemon.tipo2.nombre}  />
                                                        </>
                                                    ) : ("")}
                                                    
                                                </td>
                                                <td>
                                                    {pokemon.idEvPrevia ? (
                                                        <>
                                                            <img src={`http://localhost:3000/pokemon/${pokemon.idEvPrevia}/imagen`} alt={pokemon.nombre} width="50" />
                                                            {pokemon.evolucionPrevia?.nombre || "Sin evolución previa"}
                                                        </>
                                                    ) : ("No tiene evolución previa")}
                                                </td>
                                                <td>
                                                    {pokemon.idEvSiguiente ? (
                                                        <>
                                                            <img src={`http://localhost:3000/pokemon/${pokemon.idEvSiguiente}/imagen`} alt={pokemon.nombre} width="50" />
                                                            {pokemon.evolucionSiguiente?.nombre || "Sin evolución siguiente"}
                                                        </>
                                                    ) : ("No tiene evolución siguiente")}
                                                </td>
                                                <td>
                                                    <Link to={`/pokemon/formulario/${pokemon.id}`} className="btn btn-warning">Editar</Link>
                                                    <Link to ={`/pokemon/subirFoto/${pokemon.id}`} className="btn btn-info">Foto</Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminarPokemon(pokemon.id)}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListPokemon;
