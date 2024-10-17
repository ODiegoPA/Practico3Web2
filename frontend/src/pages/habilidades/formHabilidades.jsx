import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Container, Form} from "react-bootstrap";
import NavAdminMenu from '../../components/AdminMenu';

const FormHabilidades = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if(!id) return;
        getHabilidadById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getHabilidadById = async () => {
        axios.get(`http://localhost:3000/habilidades/${id}`)
        .then(res => {
            setNombre(res.data.nombre);
            setDescripcion(res.data.descripcion);
        }).catch(error => {
            console.log(error);
        });
    };

    const guardarHabilidad = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        if (id) {
            axios.put(`http://localhost:3000/habilidades/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate("/habilidades");
            }).catch(error => {
                console.log(error);
            });
        } else {
            axios.post("http://localhost:3000/habilidades", formData)
            .then(res => {
                console.log(res.data);
                navigate("/habilidades");
            }).catch(error => {
                console.log(error);
            });
        }
    }
    return ( 
        <>
            <NavAdminMenu />
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Formulario de Habilidades</Card.Title>
                                <Form onSubmit={guardarHabilidad}>
                                    <Form.Group controlId="formBasicNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control required type="text" placeholder="Ingrese el nombre de la habilidad" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDescripcion">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control required as="textarea" rows={3} placeholder="Ingrese la descripción de la habilidad" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Guardar
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
     );
}
 
export default FormHabilidades
;