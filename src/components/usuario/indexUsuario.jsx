import Header from "./header";
import BarraLateral from "./barraLateral";
import Inventario from "./inventario";
import Footers from "./foooter";
import { useState } from "react";


const InventarioMenu = () => {

    const [menuDespliegue, setMenuDespliegue] = useState("1")

    return (
        <>
            <div className="contenedor">
                <Header></Header>
                <BarraLateral menuDespliegue={menuDespliegue} setMenuDespliegue={setMenuDespliegue}></BarraLateral>
                {

                    menuDespliegue == "1" ? <Inventario></Inventario> : ""

                }
                <Footers></Footers>
            </div>

        </>

    );
}

export default InventarioMenu;