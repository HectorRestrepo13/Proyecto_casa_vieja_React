import React from "react";
import Login from "../components/login/login";

export { Login }

export const Registro = React.lazy(() => import('../components/registro/registro'));
export const Inventario = React.lazy(() => import('../components/usuario/indexUsuario'));

