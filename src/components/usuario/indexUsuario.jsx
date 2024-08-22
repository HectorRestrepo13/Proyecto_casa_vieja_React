import Header from "./header";
import BarraLateral from "./barraLateral";
import Inventario from "./inventario";
import Footers from "./foooter";
import { useState } from "react";
import CrearMenu from "./crearNuevoMenu";
import Pedidos from "./pedidos";


const InventarioMenu = () => {

    const [menuDespliegue, setMenuDespliegue] = useState("inventario")


    return (
        <>
            <div className="contenedor">
                <Header></Header>
                <BarraLateral menuDespliegue={menuDespliegue} setMenuDespliegue={setMenuDespliegue}></BarraLateral>
                {

                    menuDespliegue == "inventario" ? <Inventario setMenuDespliegue={setMenuDespliegue}></Inventario> : menuDespliegue == "crearNuevoMenu" ? <CrearMenu setMenuDespliegue={setMenuDespliegue}></CrearMenu> : menuDespliegue == "Pedidos" ? <Pedidos></Pedidos> : ""

                }
                <Footers></Footers>
            </div>

        </>

    );
}

export default InventarioMenu;