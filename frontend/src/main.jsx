import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPokemon from './pages/pokemon/listPokemon.jsx'
import FormPokemon from './pages/pokemon/formPokemon.jsx'
import ListTipos from './pages/tipos/listTipos.jsx'
import FormTipos from './pages/tipos/formTipos.jsx'
import ListHabilidades from './pages/habilidades/listhabilidades.jsx'
import FormHabilidades from './pages/habilidades/formHabilidades.jsx'
import FormImagenes from './pages/pokemon/formPhoto.jsx'
import MainPokedex from './pages/main/mainPokedex.jsx'
import PokemonDetail from './pages/main/pokemonDetail.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/pokemon',
    element: <ListPokemon />,
  },
  {
    path: '/pokemon/formulario',
    element: <FormPokemon />,
  },
  {
    path: '/pokemon/formulario/:id',
    element: <FormPokemon />,
  },
  {
    path:'/tipos',
    element: <ListTipos />,
  },
  {
    path:'/tipos/formulario',
    element: <FormTipos />,
  },
  {
    path:'/tipos/formulario/:id',
    element: <FormTipos />,
  },
  {
    path: '/habilidades',
    element: <ListHabilidades />,
  },
  {
    path: '/habilidades/formulario',	
    element: <FormHabilidades />,
  },
  {
    path: '/habilidades/formulario/:id',
    element: <FormHabilidades />,
  },
  {
    path: '/pokemon/subirFoto/:id',
    element: <FormImagenes />,
  },
  {
    path: '/pokedex',
    element: <MainPokedex />,
  },
  {
    path: '/pokedex/:id',
    element: <PokemonDetail/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
