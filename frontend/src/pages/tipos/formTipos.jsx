import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Container, Form} from "react-bootstrap";
import NavAdminMenu from '../../components/AdminMenu';

const FormTipos = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");

    const onChangePhoto = (e) => {
        setImagen(e.target.files[0]);
    };

    useEffect(() => {
        if(!id) return;
        getTipoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getTipoById = async () => {
        axios.get(`http://localhost:3000/tipos/${id}`)
        .then(res => {
            setNombre(res.data.nombre);
        }).catch(error => {
            console.log(error);
        });
    };


    const guardarTipo = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        if (imagen) {
            formData.append("photo", imagen);
        }
        if (id) {
            axios.put(`http://localhost:3000/tipos/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate("/tipos");
            }).catch(error => {
                console.log(error);
            });
        } else {
            axios.post("http://localhost:3000/tipos", formData)
            .then(res => {
                console.log(res.data);
                navigate("/tipos");
            }).catch(error => {
                console.log(error);
            });
        }
    }
    return ( 
        <>
            <NavAdminMenu />
        <Container>
            <Row className= "mt-3 mb-3">
                <Col md={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h3>Formulario de Tipos</h3>
                            <Form onSubmit={guardarTipo}>
                                <Form.Group className="mb-3" controlId="nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required value={nombre} type="text" onChange={(e) => {
                                        setNombre(e.target.value);
                                    }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="imagen">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control type="file" onChange={onChangePhoto} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={guardarTipo}>
                                    Guardar
                                </Button>
                            </Form>
                        </Card.Title>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
     );
}

 
export default FormTipos;