import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table,Button } from "react-bootstrap";
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
        })
    }
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
        })
    }
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
                                            <th>N Pokedex</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Habilidades</th>
                                            <th>Estadisticas</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
     );
}
 
export default ListPokemon;