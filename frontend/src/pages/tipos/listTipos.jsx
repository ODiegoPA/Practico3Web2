import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";
import '../background.css'
const ListTipos = () => {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        getListTipos();
        document.title = "Lista de Tipos";
    }, []);

    const getListTipos = async () => {
        axios.get("http://localhost:3000/tipos")
        .then(res => {
            setTipos(res.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const eliminarTipo = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este Tipo?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/tipos/${id}`)
        .then(res => {
            console.log(res.data);
            getListTipos();
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
                                <Card.Title>Lista de Tipos</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tipos.map((tipo) => (
                                            <tr key={tipo.id}>
                                                <td>
                                                    <img src={`http://localhost:3000/tipos/${tipo.id}/imagen`} alt={tipo.nombre} />
                                                </td>
                                                <td>{tipo.nombre}</td>
                                                <td>
                                                    <Link to={`/tipos/formulario/${tipo.id}`} className="btn btn-warning btn-sm">Editar</Link>
                                                </td>
                                                <td>
                                                <Button variant="danger" size="sm" onClick={() => eliminarTipo(tipo.id)}>Eliminar</Button>
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
 
export default ListTipos;