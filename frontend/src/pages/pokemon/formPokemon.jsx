import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Form} from "react-bootstrap";
import NavAdminMenu from '../../components/AdminMenu';

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [nroPokedex, setNroPokedex] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [hp, setHp] = useState("");
    const [ataque, setAtaque] = useState("");
    const [defensa, setDefensa] = useState("");
    const [ataqueEspecial, setAtaqueEspecial] = useState("");
    const [defensaEspecial, setDefensaEspecial] = useState("");
    const [velocidad, setVelocidad] = useState("");
    const [nivelEvolucion, setNivelEvolucion] = useState(null);
    const [idTipo1, setIdTipo1] = useState("");
    const [idTipo2, setIdTipo2] = useState(null);
    const [idHabilidad1, setIdHabilidad1] = useState("");
    const [idHabilidad2, setIdHabilidad2] = useState(null);
    const [idHabilidadOculta, setIdHabilidadOculta] = useState("");
    const [idEvPrevia, setIdEvPrevia] = useState(null);
    const [idEvSiguiente, setIdEvSiguiente] = useState(null);
    const [listaTipos, setListaTipos] = useState([]);
    const [listaHabilidades, setListaHabilidades] = useState([]);
    const [listaPokemones, setListaPokemones] = useState([]);


    useEffect(() => {
        if (id) {
            getPokemonById();
        }
        getTipos();
        getHabilidades();
        getPokemones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getPokemonById = async () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
        .then((res) => {
            const pokemon = res.data;
            setNombre(pokemon.nombre);
            setNroPokedex(pokemon.nroPokedex);
            setDescripcion(pokemon.descripcion);
            setHp(pokemon.hp);
            setAtaque(pokemon.ataque);
            setDefensa(pokemon.defensa);
            setAtaqueEspecial(pokemon.ataqueEspecial);
            setDefensaEspecial(pokemon.defensaEspecial);
            setVelocidad(pokemon.velocidad);
            setNivelEvolucion(pokemon.nivelEvolucion || null);
            setIdTipo1(pokemon.idTipo1);
            setIdTipo2(pokemon.idTipo2);
            setIdHabilidad1(pokemon.idHabilidad1);
            setIdHabilidad2(pokemon.idHabilidad2);
            setIdHabilidadOculta(pokemon.idHabilidadOculta);
            setIdEvPrevia(pokemon.idEvPrevia);
            setIdEvSiguiente(pokemon.idEvSiguiente);
        });
    };

    const getTipos = async () => {
        axios.get("http://localhost:3000/tipos")
        .then((res) => {
            setListaTipos(res.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    const getHabilidades = async () => {
        axios.get("http://localhost:3000/habilidades")
        .then((res) => {
            setListaHabilidades(res.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    const getPokemones = async () => {
        axios.get("http://localhost:3000/pokemon")
        .then((res) => {
            setListaPokemones(res.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    const guardarPokemon = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("nroPokedex", nroPokedex);
        formData.append("descripcion", descripcion);
        formData.append("hp", hp);
        formData.append("ataque", ataque);
        formData.append("defensa", defensa);
        formData.append("ataqueEspecial", ataqueEspecial);
        formData.append("defensaEspecial", defensaEspecial);
        formData.append("velocidad", velocidad);
        formData.append("nivelEvolucion", nivelEvolucion || null);
        formData.append("idTipo1", idTipo1);
        formData.append("idTipo2", idTipo2 || null); 
        formData.append("idHabilidad1", idHabilidad1);
        formData.append("idHabilidad2", idHabilidad2 || null);
        formData.append("idHabilidadOculta", idHabilidadOculta);
        formData.append("idEvPrevia", idEvPrevia || null);
        formData.append("idEvSiguiente", idEvSiguiente || null);

        const dataToSend = {};
        for (const [key, value] of formData.entries()) {
    // Convertir valores específicos a null si son 'null' o vacíos, y a número si son enteros
        if (key === 'idHabilidad2' || key === 'idEvPrevia' || key === 'idEvSiguiente' || 
            key === 'idTipo2' || key === 'nivelEvolucion') {

            dataToSend[key] = (value === 'null' || value === '') ? null : parseInt(value, 10);
        } else {
        dataToSend[key] = value; // Mantener como string si no es un número
    }
}

        if (id) {
            axios.put(`http://localhost:3000/pokemon/${id}`, dataToSend)
            .then(() => {
                navigate("/pokemon");
            }).catch((error) => {
                console.error(error);
            });
        } else {
            axios.post("http://localhost:3000/pokemon", dataToSend)
            .then(() => {
                navigate("/pokemon");
            }).catch((error) => {
                console.error(error);
            });
        } 
    }

    return (
        <>
            <NavAdminMenu/>
            <Container>
            <Card>
                <Card.Header>
                    <h3>{id ? "Editar Pokémon" : "Crear Pokémon"}</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={guardarPokemon} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nro Pokedex</Form.Label>
                            <Form.Control
                                type="text"
                                value={nroPokedex}
                                onChange={(e) => setNroPokedex(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>HP</Form.Label>
                            <Form.Control
                                type="number"
                                value={hp}
                                onChange={(e) => setHp(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Ataque</Form.Label>
                            <Form.Control
                                type="number"
                                value={ataque}
                                onChange={(e) => setAtaque(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Defensa</Form.Label>
                            <Form.Control
                                type="number"
                                value={defensa}
                                onChange={(e) => setDefensa(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Ataque Especial</Form.Label>
                            <Form.Control
                                type="number"
                                value={ataqueEspecial}
                                onChange={(e) => setAtaqueEspecial(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Defensa Especial</Form.Label>
                            <Form.Control
                                type="number"
                                value={defensaEspecial}
                                onChange={(e) => setDefensaEspecial(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Velocidad</Form.Label>
                            <Form.Control
                                type="number"
                                value={velocidad}
                                onChange={(e) => setVelocidad(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nivel Evolución</Form.Label>
                            <Form.Control
                                type="number"
                                value={nivelEvolucion || ""}
                                onChange={(e) => setNivelEvolucion(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tipo 1</Form.Label>
                            <Form.Control
                                as="select"
                                value={idTipo1}
                                onChange={(e) => setIdTipo1(e.target.value)}
                            >
                                <option value="">Seleccione un tipo</option>
                                {listaTipos.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tipo 2 (opcional)</Form.Label>
                            <Form.Control
                                as="select"
                                value={idTipo2 || ""}
                                onChange={(e) => setIdTipo2(e.target.value === "" ? null : e.target.value)}
                            >
                                <option value="">Seleccione un tipo</option>
                                {listaTipos.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Habilidad 1</Form.Label>
                            <Form.Control
                                as="select"
                                value={idHabilidad1}
                                onChange={(e) => setIdHabilidad1(e.target.value)}
                            >
                                <option value="">Seleccione una habilidad</option>
                                {listaHabilidades.map(habilidad => (
                                    <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Habilidad 2 (opcional)</Form.Label>
                            <Form.Control
                                as="select"
                                value={idHabilidad2 || ""}
                                onChange={(e) => setIdHabilidad2(e.target.value === "" ? null : e.target.value)}
                            >
                                <option value="">Seleccione una habilidad</option>
                                {listaHabilidades.map(habilidad => (
                                    <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Habilidad Oculta</Form.Label>
                            <Form.Control
                                as="select"
                                value={idHabilidadOculta}
                                onChange={(e) => setIdHabilidadOculta(e.target.value)}
                            >
                                <option value="">Seleccione una habilidad</option>
                                {listaHabilidades.map(habilidad => (
                                    <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pokémon Evolución Previa (opcional)</Form.Label>
                            <Form.Control
                                as="select"
                                value={idEvPrevia || ""}
                                onChange={(e) => setIdEvPrevia(e.target.value === "" ? null : e.target.value)}
                            >
                                <option value="">Seleccione un Pokémon</option>
                                {listaPokemones.map(pokemon => (
                                    <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pokémon Evolución Siguiente (opcional)</Form.Label>
                            <Form.Control
                                as="select"
                                value={idEvSiguiente || ""}
                                onChange={(e) => setIdEvSiguiente(e.target.value === "" ? null : e.target.value)}
                            >
                                <option value="">Seleccione un Pokémon</option>
                                {listaPokemones.map(pokemon => (
                                    <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default FormPokemon;
