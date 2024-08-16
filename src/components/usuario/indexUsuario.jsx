import Header from "./header";
import BarraLateral from "./barraLateral";
import Main from "./main";
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

                    menuDespliegue == "1" ? <Main></Main> : ""

                }
                <Footers></Footers>
            </div>

        </>

    );
}

export default InventarioMenu;