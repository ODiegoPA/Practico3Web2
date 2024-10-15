import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavAdminMenu = () => {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#">Pokedéx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Pokemon" id="pokemon-nav-dropdown">
                    <Link className="dropdown-item" to={"/pokemon"}>Lista de Pokemon</Link>
                    <Link className="dropdown-item" to={"/pokemon/formulario"}>Crear Pokemon</Link>
                </NavDropdown>
                <NavDropdown title="Habilidades" id="actores-nav-dropdown">
                    <Link className="dropdown-item" to={"/habilidad"}>Lista de Habilidades</Link>
                    <Link className="dropdown-item" to={"/habilidad/formulario"}>Crear Habilidad</Link>
                </NavDropdown>
                <NavDropdown title="Tipos" id="actuaciones-nav-dropdown">
                    <Link className="dropdown-item" to={"/actuaciones"}>Lista de Tipos</Link>
                    <Link className="dropdown-item" to={"/actuaciones/formulario"}>Crear Tipo</Link>
                </NavDropdown>
                <Nav className="ml-auto"> 
                        <Link className="nav-link" to={"/spoiledTangerines"}>Modo Entrenador</Link>
                </Nav>
            </Nav>
        </Navbar.Collapse>
        
        </Container>
    </Navbar>
    );
}

export default NavAdminMenu;
