import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";

const ListHabilidades = () => {
    const [habilidades, setHabilidades] = useState([]);

    useEffect(() => {
        getListHabilidades();
        document.title = "Lista de Habilidades";
    }, []);

    const getListHabilidades = async () => {
        axios.get("http://localhost:3000/habilidades")
        .then(res => {
            setHabilidades(res.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const eliminarHabilidad = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar esta Habilidad?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/habilidades/${id}`)
        .then(res => {
            console.log(res.data);
            getListHabilidades();
        }).catch(error => {
            console.log(error);
        });
    }
    return ( 
        <>
            <NavAdminMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Lista de Habilidades</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {habilidades.map((habilidad) => (
                                            <tr key={habilidad.id}>
                                                <td>{habilidad.nombre}</td>
                                                <td>{habilidad.descripcion}</td>
                                                <td>
                                                    <Link to={`/habilidades/formulario/${habilidad.id}`} className="btn btn-warning">Editar</Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminarHabilidad(habilidad.id)}>Eliminar</Button>
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
}
 
export default ListHabilidades;


