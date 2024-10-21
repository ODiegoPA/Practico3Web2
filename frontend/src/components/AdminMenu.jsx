import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AdminMenu.css';
import pokedexLogo from './pokedex.png';

const NavAdminMenu = () => {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="/pokemon">
            <img src={pokedexLogo} alt="Pokédex Logo" className="pokedex-logo" />
            Pokedéx
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Pokemon" id="pokemon-nav-dropdown">
                    <Link className="dropdown-item" to={"/pokemon"}>Lista de Pokemon</Link>
                    <Link className="dropdown-item" to={"/pokemon/formulario"}>Crear Pokemon</Link>
                </NavDropdown>
                <NavDropdown title="Habilidades" id="habilidades-nav-dropdown">
                    <Link className="dropdown-item" to={"/habilidades"}>Lista de Habilidades</Link>
                    <Link className="dropdown-item" to={"/habilidades/formulario"}>Crear Habilidad</Link>
                </NavDropdown>
                <NavDropdown title="Tipos" id="tipos-nav-dropdown">
                    <Link className="dropdown-item" to={"/tipos"}>Lista de Tipos</Link>
                    <Link className="dropdown-item" to={"/tipos/formulario"}>Crear Tipo</Link>
                </NavDropdown>
                <Nav className="ml-auto">
                        <Link className="nav-link" to={"/pokedex"}>Modo Entrenador</Link>
                </Nav>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavAdminMenu;
