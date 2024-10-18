import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import NavAdminMenu from '../../components/AdminMenu';

const FormImagenes = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imagen, setImagen] = useState("");
    const [miniImagen, setMiniImagen] = useState("");

    const onChangeImagen = (e) => {
        setImagen(e.target.files[0]);
    };

    const onChangeMiniImagen = (e) => {
        setMiniImagen(e.target.files[0]);
    };

    useEffect(() => {
        if (!id) return;
        getPokemonById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getPokemonById = async () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
        .then(res => {
            setImagen(res.data.imagen);
            setMiniImagen(res.data.miniImagen);
        }).catch(error => {
            console.log(error);
        });
    }

    const guardarFoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", imagen);
        formData.append("miniPhoto", miniImagen);
        
        axios.post(`http://localhost:3000/pokemon/${id}/imagen`, formData)
            .then(res => {
                console.log(res.data);
                navigate("/pokemon");
            }).catch(error => {
                console.log(error);
            });
    }

    return ( 
        <>
            <NavAdminMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Imagenes</Card.Title>
                                <Form onSubmit={guardarFoto}>
                                    <Form.Group controlId="formFileImagen" className="mb-3">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control type="file" onChange={onChangeImagen} />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMiniImagen" className="mb-3">
                                        <Form.Label>Mini Imagen</Form.Label>
                                        <Form.Control type="file" onChange={onChangeMiniImagen} />
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
export default FormImagenes;
