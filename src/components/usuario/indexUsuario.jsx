import Header from "./header";
import BarraLateral from "./barraLateral";
import Inventario from "./inventario";
import Footers from "./foooter";
import { useState } from "react";
import CrearMenu from "./crearNuevoMenu";
import Pedidos from "./pedidos";
import Inicio from "./inicioRecepcionista";
import Usuarios from "./administrarUsuarios";
import CrearUsuario from "./crearNuevoUsuario";
import Graficas from "./graficas";
import VerPerfil from "./verPerfilUsuario";
import Cocina from "./pantallaCocina";
import Eventos from "./organizadorEventos";


const InventarioMenu = () => {

    const [menuDespliegue, setMenuDespliegue] = useState("inventario")


    return (
        <>
            <div className="contenedor">
                <Header setMenuDespliegue={setMenuDespliegue}></Header>
                <BarraLateral menuDespliegue={menuDespliegue} setMenuDespliegue={setMenuDespliegue}></BarraLateral>
                {

                    menuDespliegue == "inventario" ? <Inventario setMenuDespliegue={setMenuDespliegue}></Inventario> : menuDespliegue == "crearNuevoMenu" ? <CrearMenu setMenuDespliegue={setMenuDespliegue}></CrearMenu> : menuDespliegue == "Pedidos" ? <Pedidos></Pedidos> : menuDespliegue == "Recepcionista" ? <Inicio></Inicio> : menuDespliegue == "administrarUsuarios" ? <Usuarios setMenuDespliegue={setMenuDespliegue}></Usuarios> : menuDespliegue == "crearNuevoUsuario" ? <CrearUsuario setMenuDespliegue={setMenuDespliegue}></CrearUsuario> : menuDespliegue == "Graficas" ? <Graficas setMenuDespliegue={setMenuDespliegue}></Graficas> : menuDespliegue == "verPerfilUsuario" ? <VerPerfil></VerPerfil> : menuDespliegue == "pantallaCocina" ? <Cocina></Cocina> : menuDespliegue == "organizadorEventos" ? <Eventos></Eventos> : ""

                }
                <Footers></Footers>
            </div>

        </>

    );
}

export default InventarioMenu;