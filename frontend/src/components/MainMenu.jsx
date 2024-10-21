import { Container, Navbar, Form, Button, Row, Col, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./MainMenu.css";
import pokedexLogo from './pokedex.png';


const NavMainMenu = () => {
    const [nombre, setNombre] = useState("");
    const [tipo1, setTipo1] = useState("");
    const [tipo2, setTipo2] = useState("");
    const [tipos, setTipos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTipos();
    }, []);

    const getTipos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/tipos");
            setTipos(response.data);
        } catch (error) {
            console.error("Error al obtener los tipos:", error);
        }
    };

    const handleBuscar = (e) => {
        e.preventDefault();

        const nombreFilter = isNaN(nombre) || nombre === "" ? nombre : null;
        const nroPokedexFilter = isNaN(nombre) ? null : nombre;
        const tipo1Filter = tipo1 || null;
        const tipo2Filter = tipo2 || null;

        let url = `http://localhost:3000/pokemon`;
        url += `/tipo1/${tipo1Filter || "null"}`;
        url += `/tipo2/${tipo2Filter || "null"}`;
        url += `/nombre/${nombreFilter || "null"}`;
        url += `/nro/${nroPokedexFilter || "null"}`;

        navigate("/pokedex", { state: { url } });
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className="justify-content-center">
                <Navbar.Brand href="/pokedex" className="custom-navbar-brand">
                <img src={pokedexLogo} alt="Pokédex Logo" className="pokedex-logo" />
                    Pokedéx
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="d-flex ml-auto" onSubmit={handleBuscar}>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre o Nº"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Select
                                    value={tipo1}
                                    onChange={(e) => setTipo1(e.target.value)}
                                >
                                    <option value="">Tipo 1</option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    value={tipo2}
                                    onChange={(e) => setTipo2(e.target.value)}
                                    disabled={!tipo1}
                                >
                                    <option value="">Tipo 2</option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Buscar
                                </Button>
                            </Col>
                            <Col>
                                <Nav className="ml-auto">
                                    <Link className="nav-link" to={"/pokemon"}>Modo Admin</Link>
                                </Nav>
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavMainMenu;
