import Header from "./header";
import BarraLateral from "./barraLateral";
import Main from "./main";
import Footers from "./foooter";


const InventarioMenu = () => {
    return (
        <>
            <div className="contenedor">
                <Header></Header>
                <BarraLateral></BarraLateral>
                <Main></Main>
                <Footers></Footers>
            </div>

        </>

    );
}

export default InventarioMenu;