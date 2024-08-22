import { useState } from "react";

const BarraLateral = ({ menuDespliegue, setMenuDespliegue }) => {



    return (


        <>
            {/* <!-- ======= Sidebar ======= --> */}
            <aside style={{ backgroundColor: "#F7F2EC" }} id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li onClick={() => { setMenuDespliegue("1") }} className="nav-item" >
                        <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "1" ? "nav-link" : "nav-link collapsed"} href="#">
                            <i className="bi bi-grid"></i>
                            <span>Inicio</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li onClick={() => { setMenuDespliegue("Pedidos") }} className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "Pedidos" ? "nav-link" : "nav-link collapsed"} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Pedidos</span>
                        </a>

                    </li>
                    {/* <!-- End Components Nav --> */}

                    <li onClick={() => { setMenuDespliegue("inventario") }} className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className={menuDespliegue == "inventario" || menuDespliegue == "crearNuevoMenu" ? "nav-link" : "nav-link collapsed"} data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Inventario</span>
                        </a>

                    </li>
                    {/* <!-- End Forms Nav --> */}



                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-bar-chart"></i><span>Charts</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="charts-chartjs.html">
                                    <i className="bi bi-circle"></i><span>Chart.js</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i className="bi bi-circle"></i><span>ApexCharts</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-echarts.html">
                                    <i className="bi bi-circle"></i><span>ECharts</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Charts Nav --> */}

                    <li className="nav-item">
                        <a style={{ backgroundColor: "#F5EDEB" }} className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-gem"></i><span>ADMIN</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="icons-bootstrap.html">
                                    <i className="bi bi-circle"></i><span>Bootstrap Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-remix.html">
                                    <i className="bi bi-circle"></i><span>Remix Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-boxicons.html">
                                    <i className="bi bi-circle"></i><span>Boxicons</span>
                                </a>
                            </li>
                        </ul>
                    </li>
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