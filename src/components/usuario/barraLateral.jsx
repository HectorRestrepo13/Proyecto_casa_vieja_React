import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const BarraLateral = ({ menuDespliegue, setMenuDespliegue }) => {


    const [datosUsuario, setDatosUsuario] = useState(4);


    // FUNCION PARA OBTENER LOS DATOS DEL USUARIO
    const obtenerDatosUsuario = () => {


        // Traigo el token del localStorage
        let token = localStorage.getItem("tokenUsuario");

        // Decodificar el token sin verificar la firma
        const tokenDescodificado = jwtDecode(token);
        setDatosUsuario(tokenDescodificado.datos[0].RolId)

        switch (tokenDescodificado.datos[0].RolId) {
            case 1:
                setMenuDespliegue("inventario");

                break;
            case 2:
                setMenuDespliegue("Recepcionista");

                break;
            case 3:
                setMenuDespliegue("Pedidos");

                break;
            case 4:
                setMenuDespliegue("Recepcionista");

                break;

            default:
                break;
        }



    }

    useEffect(() => {
        obtenerDatosUsuario();
    }, [])

    return (


        <>
            {/* <!-- ======= Sidebar ======= --> */}
            <aside style={{ backgroundColor: "#F7F2EC" }} id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">
                    {/* // el idRol "4" es el RECEPCIONISTA, el idRol "3" es el MESERO, el idRol "2" es el CAJERO, el idRol "1" es el ADMIN  */}


                    {
                        // pagina del RECEPCIONISTA
                        datosUsuario == 4 || datosUsuario == 2 ? (<>

                            <li onClick={() => { setMenuDespliegue("Recepcionista") }} className="nav-item" >
                                <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "Recepcionista" ? "nav-link" : "nav-link collapsed"} href="#">
                                    <i className="bi bi-grid"></i>
                                    <span>Recepcionista</span>
                                </a>
                            </li>

                        </>) : (<></>)
                    }
                    {
                        // pagina del Pedidos

                        datosUsuario == 4 || datosUsuario == 3 || datosUsuario == 2 ? (<>


                            <li onClick={() => { setMenuDespliegue("Pedidos") }} className="nav-item">
                                <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "Pedidos" ? "nav-link" : "nav-link collapsed"} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                                    <i className="bi bi-journal-text"></i><span>Pedidos</span>
                                </a>

                            </li>

                        </>) : (<></>)
                    }
                    {
                        // pagina del Inventario

                        datosUsuario == 4 || datosUsuario == 1 || datosUsuario == 2 ? (<>

                            <li onClick={() => { setMenuDespliegue("inventario") }} className="nav-item">
                                <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "inventario" || menuDespliegue == "crearNuevoMenu" ? "nav-link" : "nav-link collapsed"} data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                                    <i className="bi bi-menu-button-wide"></i><span>Inventario</span>
                                </a>

                            </li>

                        </>) : (<></>)
                    }
                    {
                        // pagina del ADMIN

                        datosUsuario == 1 ? (<>

                            <li className="nav-item">
                                <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                                    <i className="bi bi-gem"></i><span>ADMIN</span><i className="bi bi-chevron-down ms-auto"></i>
                                </a>
                                <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <a onClick={() => { setMenuDespliegue("administrarUsuarios") }} href="#">
                                            <i className="bi bi-circle"></i><span>Usuarios</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="bi bi-circle"></i><span>Graficas</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="icons-boxicons.html">
                                            <i className="bi bi-circle"></i><span>Boxicons</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </>) : (<></>)
                    }




                    {/* <!-- End Icons Nav --> */}

                    <li className="nav-heading">Paginas</li>

                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" href="users-profile.html">
                            <i className="bi bi-person"></i>
                            <span>Perfil</span>
                        </a>
                    </li>
                    {/* <!-- End Profile Page Nav --> */}

                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" href="pages-contact.html">
                            <i className="bi bi-envelope"></i>
                            <span>Contacto</span>
                        </a>
                    </li>
                    {/* <!-- End Contact Page Nav --> */}

                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" href="pages-register.html">
                            <i className="bi bi-card-list"></i>
                            <span>Registrar</span>
                        </a>
                    </li>
                    {/* <!-- End Register Page Nav --> */}

                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" href="pages-login.html">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Salir</span>
                        </a>
                    </li>
                    {/* <!-- End Login Page Nav --> */}


                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}
        </>
    );
}

export default BarraLateral;