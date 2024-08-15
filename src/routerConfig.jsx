import { Login, Registro, Inventario } from "./pages"

export const routes = [
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/registro',
        element: <Registro></Registro>
    },
    {
        path: '/inventarioMenu',
        element: <Inventario></Inventario>
    },

]